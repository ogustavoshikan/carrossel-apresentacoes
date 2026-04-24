import React, { useState, useEffect, useRef } from 'react';
import {
    Loader2,
    Send,
    Copy,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Image as ImageIcon,
    Upload,
    Sparkles,
    Settings2,
    Download,
    RotateCcw,
    ChevronLeft,
    Share,
    MoreHorizontal,
    ChevronRight,
    BadgeCheck,
    Move,
    Store,
    Ruler,
    Bookmark,
    Heart,
    MessageCircle,
    ArrowRight,
    Quote,
    Instagram,
    Share2,
    Target,
    Zap,
    Trophy,
    BarChart3,
    PanelRightClose
} from 'lucide-react';

export default function App() {
    const [theme, setTheme] = useState('');
    const [slides, setSlides] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [viewMode, setViewMode] = useState('visual');
    const [showMetrics, setShowMetrics] = useState(false);
    const [loadingImages, setLoadingImages] = useState({});
    const [slideCount, setSlideCount] = useState(6);

    // Drag, Resize & Edit State
    const [actionInfo, setActionInfo] = useState(null);

    // Brand Customization State (Alice System Defaults)
    const [brandHandle, setBrandHandle] = useState('TIAJOANABRIGADEIROS');
    const [brandWebsite, setBrandWebsite] = useState('Alice System v3.2');
    const [profilePic, setProfilePic] = useState(null);
    const [innerLogo, setInnerLogo] = useState(null);
    const [isVerified, setIsVerified] = useState(true);
    const [swipeText, setSwipeText] = useState('Deslize para adoçar o dia');
    const [gradientColor1, setGradientColor1] = useState('#DE1E4D');
    const [gradientColor2, setGradientColor2] = useState('#FFFFFF');
    const [titleFont, setTitleFont] = useState('Outfit');
    const [textFont, setTextFont] = useState('Playfair Display');
    const [titleSizeScale, setTitleSizeScale] = useState(100);
    const [textSizeScale, setTextSizeScale] = useState(100);
    const [isExporting, setIsExporting] = useState(false);

    const fontOptions = ['Inter', 'Montserrat', 'Roboto', 'Poppins', 'Playfair Display', 'Oswald', 'Outfit', 'Space Grotesk'];

    // --- MOTOR DE INTERAÇÃO (DRAG E RESIZE) ---
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!actionInfo) return;

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const dx = clientX - actionInfo.startX;
            const dy = clientY - actionInfo.startY;

            setSlides(prev => prev.map((s, i) => {
                if (i === actionInfo.index) {
                    const pos = s.positions?.[actionInfo.field] || { x: 0, y: 0, scale: 1 };

                    if (actionInfo.type === 'drag') {
                        return {
                            ...s,
                            positions: {
                                ...(s.positions || {}),
                                [actionInfo.field]: { ...pos, x: actionInfo.origX + dx, y: actionInfo.origY + dy }
                            }
                        };
                    } else if (actionInfo.type === 'resize') {
                        const scaleDelta = (dx + dy) * 0.005;
                        const newScale = Math.max(0.3, actionInfo.origScale + scaleDelta);
                        return {
                            ...s,
                            positions: {
                                ...(s.positions || {}),
                                [actionInfo.field]: { ...pos, scale: newScale }
                            }
                        };
                    }
                }
                return s;
            }));
        };

        const handleMouseUp = () => {
            if (actionInfo) setActionInfo(null);
        };

        if (actionInfo) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMouseMove, { passive: false });
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [actionInfo]);

    const handleActionStart = (e, index, field, type) => {
        if (!e.touches && e.button !== 0) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const slide = slides[index];
        const pos = slide.positions?.[field] || { x: 0, y: 0, scale: 1 };

        setActionInfo({
            type, index, field,
            startX: clientX, startY: clientY,
            origX: pos.x, origY: pos.y, origScale: pos.scale || 1
        });
    };

    const resetSlidePositions = (index) => {
        setSlides(prev => prev.map((s, i) => i === index ? { ...s, positions: {} } : s));
    };

    const exportAllToPNG = async () => {
        setIsExporting(true);
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        const originalScrollY = window.scrollY;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);

        await new Promise(r => setTimeout(r, 150));
        await document.fonts.ready;

        try {
            if (!window.htmlToImage) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            for (let i = 0; i < slides.length; i++) {
                const element = document.getElementById(`slide-card-${i}`);
                if (!element) continue;

                const dataUrl = await window.htmlToImage.toPng(element, {
                    pixelRatio: 3,
                    backgroundColor: '#020202'
                });
                const link = document.createElement('a');
                const safeHandle = brandHandle.replace('@', '');
                link.download = `${safeHandle}_slide_${i + 1}.png`;
                link.href = dataUrl;
                link.click();

                await new Promise(r => setTimeout(r, 600));
            }
        } catch (err) {
            console.error("Erro ao exportar:", err);
            setError("Deu BO na hora de gerar os PNGs. O navegador arregou.");
        } finally {
            setIsExporting(false);
            document.documentElement.style.scrollBehavior = '';
            window.scrollTo(0, originalScrollY);
        }
    };

    const handleImageUpload = (index, event) => {
        const file = event.target.files[0];
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        setSlides(prev => prev.map((s, i) => i === index ? { ...s, imageUrl, imagePosition: 50 } : s));
    };

    const handleProfilePicUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setProfilePic(URL.createObjectURL(file));
    };

    const handleInnerLogoUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setInnerLogo(URL.createObjectURL(file));
    };

    const handleImagePosition = (index, value) => {
        setSlides(prev => prev.map((s, i) => i === index ? { ...s, imagePosition: value } : s));
    };

    const handleSlideTextChange = (index, field, value) => {
        setSlides(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
    };

    const handleSlideItemChange = (slideIndex, itemIndex, field, value) => {
        setSlides(prev => prev.map((s, i) => {
            if (i === slideIndex) {
                const newItems = [...(s.items || [])];
                newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
                return { ...s, items: newItems };
            }
            return s;
        }));
    };

    const generateImageWithAI = async (index, prompt) => {
        setLoadingImages(prev => ({ ...prev, [index]: true }));
        try {
            const apiKey = "";
            const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

            const payload = {
                instances: { prompt: prompt + " -- highly detailed, dramatic lighting, premium quality, 8k" },
                parameters: {
                    sampleCount: 1,
                    aspectRatio: "3:4"
                }
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Falha na API de Imagem");

            const data = await response.json();
            const imageUrl = `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;

            setSlides(prev => prev.map((s, i) => i === index ? { ...s, imageUrl, imagePosition: 50 } : s));
        } catch (err) {
            console.error(err);
            setError("Erro ao gerar imagem. A IA tá de greve, faz upload manual.");
        } finally {
            setLoadingImages(prev => ({ ...prev, [index]: false }));
        }
    };

    const generateCarousel = async () => {
        if (!theme.trim()) {
            setError('Digite um tema primeiro. Não sou telepata, Mr. Gustavo.');
            return;
        }

        setIsGenerating(true);
        setError('');
        setSlides([]);

        const apiKey = "";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        const systemPrompt = `Você é um diretor de arte e copywriter de elite (Carrossel Studio) focado em criar conteúdo premium, irônico e de alta conversão.
        O usuário vai te dar um tema. Crie EXATAMENTE ${slideCount} slides.
        
        A linguagem DEVE ser: sofisticada, ácida, direta e gerar alto valor percebido. Escreva em Português do Brasil IMPECÁVEL.

        Você DEVE categorizar rigorosamente cada slide usando UM destes 7 layouts:
        1. "cover": SEMPRE O SLIDE 1. Campos: titulo (ex: "TOP\\n05", curto e de impacto), texto_apoio como subtítulo, sugestao_visual.
        2. "content-split": imagem no topo + tag + título + texto. Campos: tag, titulo, texto_apoio, sugestao_visual.
        3. "big-number": número grande de impacto. Campos: titulo (o número, ex: "82%"), tag (o label em caixa alta), texto_apoio, sugestao_visual.
        4. "quote": citação de impacto. Campos: titulo (a frase), texto_apoio (autor).
        5. "comparison": lista de comparação Mercado vs Marca. Campos: titulo, items (array com 'label', 'value' e 'highlight' booleano).
        6. "list": lista estruturada. Campos: titulo, items (array com 'label' e 'text').
        7. "cta": SEMPRE O ÚLTIMO SLIDE. Campos: titulo, texto_apoio, tag (texto do botão curtos, ex: "ENCOMENDAR").

        Regras Estruturais Obrigatórias:
        - Slide 1: "cover".
        - Slide ${slideCount}: "cta".
        - Use "comparison", "list", "quote", "big-number" e "content-split" para os slides do miolo.
        - Não coloque aspas no título da 'quote', o layout já tem.

        Responda ESTRITAMENTE em formato JSON.`;

        const payload = {
            contents: [{ parts: [{ text: `Tema/Texto Base: ${theme}` }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            slide: { type: "INTEGER" },
                            layout: {
                                type: "STRING",
                                enum: ["cover", "content-split", "big-number", "quote", "comparison", "list", "cta"]
                            },
                            titulo: { type: "STRING" },
                            texto_apoio: { type: "STRING" },
                            sugestao_visual: { type: "STRING" },
                            tag: { type: "STRING" },
                            items: {
                                type: "ARRAY",
                                items: {
                                    type: "OBJECT",
                                    properties: {
                                        label: { type: "STRING" },
                                        value: { type: "STRING" },
                                        text: { type: "STRING" },
                                        highlight: { type: "BOOLEAN" }
                                    }
                                }
                            }
                        },
                        required: ["slide", "layout", "titulo"]
                    }
                }
            }
        };

        try {
            let retries = 5;
            let delay = 1000;
            let response;
            let data;

            while (retries > 0) {
                response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    data = await response.json();
                    break;
                }

                retries--;
                if (retries === 0) throw new Error(`Falha na API: ${response.status}`);
                await new Promise(res => setTimeout(res, delay));
                delay *= 2;
            }

            const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (generatedText) {
                const sanitizedText = generatedText.replace(/!NCIA/g, 'ÊNCIA').replace(/!ncia/g, 'ência');
                const parsedSlides = JSON.parse(sanitizedText);
                setSlides(parsedSlides);
            } else {
                throw new Error("A IA respondeu vazio.");
            }

        } catch (err) {
            console.error(err);
            setError("Deu ruim na geração. Alice cansou, tente de novo.");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text, index) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) { }
        document.body.removeChild(textArea);
    };

    const copyAll = () => {
        const allText = slides.map(s => `[Slide ${s.slide} - ${s.layout}]\nHeadline: ${s.titulo}\nTexto: ${s.texto_apoio}\n`).join('\n---\n\n');
        copyToClipboard(allText, 'all');
    };

    // --- SMART ELEMENT ---
    const SmartEl = ({ slideIndex, field, children, className }) => {
        const pos = slides[slideIndex].positions?.[field] || { x: 0, y: 0, scale: 1 };
        const elRef = useRef(null);
        const [dims, setDims] = useState({ w: 0, h: 0 });

        useEffect(() => {
            if (showMetrics && elRef.current) {
                setDims({
                    w: Math.round(elRef.current.offsetWidth * pos.scale),
                    h: Math.round(elRef.current.offsetHeight * pos.scale)
                });
            }
        }, [showMetrics, pos.scale, pos.x, pos.y, children, slides[slideIndex][field]]);

        return (
            <div
                ref={elRef}
                className={`group relative transition-all ${className || ''}`}
                style={{
                    transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
                    zIndex: showMetrics ? 50 : 40,
                    transformOrigin: 'center center'
                }}
            >
                {showMetrics && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#DE1E4D] text-white text-[10px] font-mono font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none z-[60] border border-[#DE1E4D] opacity-90 backdrop-blur-sm">
                        W: {dims.w}px | H: {dims.h}px | S: {pos.scale.toFixed(2)}x
                    </div>
                )}

                <div
                    onMouseDown={(e) => { e.stopPropagation(); handleActionStart(e, slideIndex, field, 'drag'); }}
                    onTouchStart={(e) => { e.stopPropagation(); handleActionStart(e, slideIndex, field, 'drag'); }}
                    className="absolute -top-3 -left-3 w-6 h-6 bg-zinc-800 text-rose-500 rounded-full cursor-move opacity-0 group-hover:opacity-100 flex items-center justify-center z-50 shadow-lg border border-zinc-700 pointer-events-auto"
                >
                    <Move size={12} />
                </div>

                <div className={`w-full h-full outline-none transition-all ${showMetrics ? 'outline outline-1 outline-dashed outline-[#DE1E4D]/50 bg-[#DE1E4D]/10' : 'hover:outline hover:outline-1 hover:outline-dashed hover:outline-[#DE1E4D]/50'}`}>
                    {children}
                </div>

                <div
                    onMouseDown={(e) => { e.stopPropagation(); handleActionStart(e, slideIndex, field, 'resize'); }}
                    onTouchStart={(e) => { e.stopPropagation(); handleActionStart(e, slideIndex, field, 'resize'); }}
                    className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#DE1E4D] rounded-full cursor-nwse-resize opacity-0 group-hover:opacity-100 shadow border-2 border-zinc-900 z-50 pointer-events-auto"
                />
            </div>
        );
    };

    // CARROSSEL STUDIO SLIDE HEADERS & FOOTERS
    const SlideHeader = ({ index, total, dark = false }) => (
        <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
            <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${dark ? 'bg-black' : ''}`} style={{ backgroundColor: dark ? '#000' : gradientColor1 }} />
                <span className={`font-outfit font-black tracking-[0.25em] text-[10px] uppercase ${dark ? 'text-black/60' : 'text-zinc-500'}`}>
                    @{brandHandle}
                </span>
            </div>
            <div className={`font-outfit font-bold text-[11px] px-3 py-1.5 rounded-lg border backdrop-blur-xl ${dark ? 'bg-black/5 text-black border-black/10' : 'bg-white/5 text-zinc-400 border-white/10'}`}>
                {index} <span className="opacity-30 mx-1">/</span> {total}
            </div>
        </div>
    );

    const SlideFooterPlaceholder = () => (
        <div className="h-10 w-full pointer-events-none" />
    );

    const renderVisualCard = (data, index) => {
        const sTitle = titleSizeScale / 100;
        const sText = textSizeScale / 100;
        const slideData = data;
        const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
        const bgBase = '#ffffff';

        const TextWrapper = ({ as: Component = 'div', field, children, className, style, ...props }) => {
            return (
                <Component
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleSlideTextChange(index, field, e.currentTarget.innerText)}
                    className={`outline-none ${className || ''}`}
                    style={style}
                    {...props}
                >
                    {children}
                </Component>
            );
        };

        switch (data.layout) {
            case 'cover-18':
                return (
                    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col justify-center items-center p-6">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-luminosity" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[90px] opacity-60" style={{ backgroundColor: gradientColor1 }} />
                        </div>
                        <div className="relative z-10 w-full bg-white/10 backdrop-blur-md border rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl" style={{ borderColor: '#DE1E4D50' }}>
                            <SmartEl slideIndex={index} field="texto_apoio" className="mb-4">
                                <TextWrapper as="span" field="texto_apoio" className="text-white tracking-[0.2em] uppercase text-[10px] font-bold py-1.5 px-4 rounded-full bg-black/50 shadow-inner border border-white/10" style={{ fontFamily: titleFont, color: gradientColor1 }}>
                                    {slideData.texto_apoio}
                                </TextWrapper>
                            </SmartEl>
                            <SmartEl slideIndex={index} field="titulo" className="w-full">
                                <TextWrapper as="h2" field="titulo" className="font-black text-white leading-[1] tracking-tighter whitespace-pre-line drop-shadow-lg" style={{ fontFamily: titleFont, fontSize: `${42 * sTitle}px` }}>
                                    {slideData.titulo}
                                </TextWrapper>
                            </SmartEl>
                        </div>
                        <div className="absolute bottom-8 w-full px-8 flex justify-between items-center z-10">
                            <span className="font-bold tracking-widest text-[10px] text-white drop-shadow uppercase" style={{ fontFamily: titleFont }}>{brandHandle}</span>
                            <ArrowRight className="w-5 h-5 text-white drop-shadow" />
                        </div>
                    </div>
                );

            case 'cover-19':
                return (
                    <div className="w-full h-full p-6 flex flex-col overflow-hidden" style={{ backgroundColor: bgBase }}>
                        <div className="w-full flex-1 rounded-t-full rounded-b-xl overflow-hidden bg-zinc-300 relative shadow-inner mb-6 border-[6px]" style={{ borderColor: gradientColor1 }}>
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-t-xl text-[10px] font-bold uppercase tracking-widest" style={{ color: gradientColor1, fontFamily: titleFont }}>Featured</div>
                        </div>
                        <div className="w-full flex flex-col items-center text-center shrink-0 mb-4">
                            <SmartEl slideIndex={index} field="titulo" className="w-full mb-2">
                                <TextWrapper as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-[1] tracking-tight whitespace-pre-line" style={{ fontFamily: titleFont, fontSize: `${38 * sTitle}px` }}>
                                    {slideData.titulo}
                                </TextWrapper>
                            </SmartEl>
                            <SmartEl slideIndex={index} field="texto_apoio">
                                <TextWrapper as="span" field="texto_apoio" className="tracking-[0.2em] uppercase text-[9px] font-bold" style={{ color: gradientColor1, fontFamily: titleFont }}>
                                    {slideData.texto_apoio}
                                </TextWrapper>
                            </SmartEl>
                        </div>
                    </div>
                );

            case 'cover-20':
                return (
                    <div className="w-full h-full p-6 flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: bgBase }}>
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                        <div className="bg-white p-4 pb-12 shadow-2xl rotate-2 w-[90%] relative z-10 flex flex-col">
                            <div className="w-full aspect-[4/5] bg-zinc-200 relative mb-5 border border-zinc-100">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
                            </div>
                            <SmartEl slideIndex={index} field="titulo">
                                <TextWrapper as="h2" field="titulo" className="font-black text-center text-[#1a1a1a] leading-[1.1] tracking-tighter" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
                                    {slideData.titulo}
                                </TextWrapper>
                            </SmartEl>
                        </div>
                        <div className="absolute bottom-10 left-10 z-20 rotate-[-4deg]">
                            <SmartEl slideIndex={index} field="texto_apoio">
                                <TextWrapper as="span" field="texto_apoio" className="text-white px-4 py-1.5 font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg" style={{ backgroundColor: gradientColor1, fontFamily: titleFont }}>
                                    {slideData.texto_apoio}
                                </TextWrapper>
                            </SmartEl>
                        </div>
                    </div>
                );

            case 'cover-21':
                return (
                    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: gradientColor1 }}>
                        <div className="absolute top-0 right-0 w-[150%] h-[65%] bg-black origin-top-right -rotate-12 z-0 overflow-hidden shadow-2xl border-b-[12px] border-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-80 rotate-12 scale-150" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
                        </div>
                        <div className="relative z-10 w-full h-full p-8 flex flex-col justify-end pb-12">
                            <SmartEl slideIndex={index} field="titulo" className="w-full shrink-0 mb-4">
                                <TextWrapper as="h2" field="titulo" className="font-black leading-[0.8] tracking-tighter text-white uppercase whitespace-pre-line drop-shadow-md" style={{ fontFamily: titleFont, fontSize: `${72 * sTitle}px` }}>
                                    {slideData.titulo}
                                </TextWrapper>
                            </SmartEl>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-1 bg-white" />
                                <SmartEl slideIndex={index} field="texto_apoio" className="shrink-0">
                                    <TextWrapper as="p" field="texto_apoio" className="text-white tracking-[0.3em] text-[10px] font-bold uppercase" style={{ fontFamily: titleFont }}>
                                        {slideData.texto_apoio}
                                    </TextWrapper>
                                </SmartEl>
                            </div>
                        </div>
                    </div>
                );

            case 'cover-22':
                return (
                    <div className="w-full h-full p-8 flex flex-col justify-between overflow-hidden" style={{ backgroundColor: bgBase }}>
                        <SlideHeader index={slideData.slide || index + 1} total={slides.length} />
                        <div className="flex-1 flex flex-col justify-center relative">
                            <div className="absolute -left-4 top-1/4 w-32 h-32 rounded-full blur-[60px] z-0 opacity-50" style={{ backgroundColor: gradientColor1 }} />
                            <SmartEl slideIndex={index} field="titulo" className="mb-6 z-10">
                                <TextWrapper as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-[0.85] tracking-tighter uppercase break-words" style={{ fontFamily: titleFont, fontSize: `${80 * sTitle}px` }}>
                                    {slideData.titulo}
                                </TextWrapper>
                            </SmartEl>
                            <SmartEl slideIndex={index} field="texto_apoio" className="z-10">
                                <TextWrapper as="p" field="texto_apoio" className="font-bold tracking-[0.3em] uppercase text-[12px]" style={{ color: gradientColor1, fontFamily: titleFont }}>
                                    {slideData.texto_apoio}
                                </TextWrapper>
                            </SmartEl>
                        </div>
                    </div>
                );

            case 'cover-23':
                return (
                    <div className="w-full h-full flex flex-row overflow-hidden relative" style={{ backgroundColor: bgBase }}>
                        <div className="w-[45%] h-full shrink-0 flex flex-col justify-between p-6 z-10" style={{ backgroundColor: gradientColor1, color: 'white' }}>
                            <span className="font-bold text-[10px] tracking-widest uppercase transform -rotate-90 origin-top-left translate-y-[200px]" style={{ fontFamily: titleFont }}>{brandHandle}</span>
                            <div className="w-8 h-[2px] bg-white mb-8" />
                        </div>
                        <div className="w-[55%] h-full shrink-0 relative bg-zinc-800 z-0">
                            <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-80" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
                        </div>
                        <div className="absolute top-1/2 left-[10%] -translate-y-1/2 z-20 w-[80%]">
                            <SmartEl slideIndex={index} field="texto_apoio" className="mb-4">
                                <TextWrapper as="p" field="texto_apoio" className="text-white font-bold tracking-[0.2em] text-[11px] uppercase bg-black/50 inline-block px-3 py-1 rounded" style={{ fontFamily: titleFont }}>
                                    {slideData.texto_apoio}
                                </TextWrapper>
                            </SmartEl>
                            <SmartEl slideIndex={index} field="titulo">
                                <TextWrapper as="h2" field="titulo" className="font-black leading-[0.9] tracking-tighter uppercase whitespace-pre-line text-white drop-shadow-2xl" style={{ fontFamily: titleFont, fontSize: `${64 * sTitle}px` }}>
                                    {slideData.titulo}
                                </TextWrapper>
                            </SmartEl>
                        </div>
                    </div>
                );

            case 'cover-24':
                return (
                    <div className="w-full h-full p-6 flex flex-col overflow-hidden" style={{ backgroundColor: bgBase }}>
                        <div className="flex-1 border-2 flex flex-col p-6 relative overflow-hidden" style={{ borderColor: gradientColor1 }}>
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${gradientColor1} 1px, transparent 1px), linear-gradient(90deg, ${gradientColor1} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                            <div className="flex justify-between items-center mb-auto relative z-10 shrink-0">
                                <div className="w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-xs" style={{ borderColor: gradientColor1, color: gradientColor1, fontFamily: titleFont }}>01</div>
                                <span className="font-bold tracking-widest text-[9px] uppercase" style={{ color: gradientColor1, fontFamily: titleFont }}>O PROCESSO</span>
                            </div>
                            <div className="relative z-10 shrink-0 mb-6">
                                <SmartEl slideIndex={index} field="titulo">
                                    <TextWrapper as="h2" field="titulo" className="font-black leading-[0.8] tracking-tighter uppercase break-words" style={{ color: gradientColor1, fontFamily: titleFont, fontSize: `${80 * sTitle}px` }}>
                                        {slideData.titulo}
                                    </TextWrapper>
                                </SmartEl>
                            </div>
                            <div className="w-full h-[30%] shrink-0 bg-zinc-300 relative border-t-2" style={{ borderColor: gradientColor1 }}>
                                <div className="absolute inset-0 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
                            </div>
                        </div>
                    </div>
                );

            case 'cover-25':
                return (
                    <div className="w-full h-full relative overflow-hidden bg-zinc-900 flex flex-col items-center justify-center p-6">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-cover bg-center opacity-70 blur-sm scale-110" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="relative z-10 w-full h-[75%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl flex flex-col justify-between p-8">
                            <div className="flex justify-between items-center w-full">
                                <span className="font-bold tracking-widest text-[9px] text-white/90 uppercase" style={{ fontFamily: titleFont }}>{brandHandle}</span>
                                <div className="w-8 h-[1px] bg-white/50" />
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <SmartEl slideIndex={index} field="texto_apoio" className="mb-4">
                                    <TextWrapper as="span" field="texto_apoio" className="text-white tracking-[0.3em] uppercase text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 bg-white/10" style={{ fontFamily: titleFont }}>
                                        {slideData.texto_apoio}
                                    </TextWrapper>
                                </SmartEl>
                                <SmartEl slideIndex={index} field="titulo" className="w-full">
                                    <TextWrapper as="h2" field="titulo" className="font-black text-white leading-tight tracking-tighter whitespace-pre-line drop-shadow-xl" style={{ fontFamily: titleFont, fontSize: `${48 * sTitle}px` }}>
                                        {slideData.titulo}
                                    </TextWrapper>
                                </SmartEl>
                            </div>
                            <div className="flex justify-center items-center w-full">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md border border-white/10">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'cover-26':
                return (
                    <div className="w-full h-full flex flex-col overflow-hidden relative" style={{ backgroundColor: bgBase }}>
                        <div className="w-full h-[55%] relative shrink-0 z-0" style={{ backgroundColor: gradientColor1 }}>
                            <div className="absolute top-6 left-6 w-[80%] flex justify-between items-center z-20">
                                <span className="font-black text-[10px] uppercase tracking-widest text-white border border-white/30 px-2 py-1" style={{ fontFamily: titleFont }}>VOL. 14</span>
                                <span className="font-bold tracking-widest text-[9px] text-white/80 uppercase" style={{ fontFamily: titleFont }}>
                                    @{brandHandle}
                                </span>
                            </div>
                            <div className="absolute inset-0 z-10 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 20% 150%, white 0%, transparent 60%)' }} />
                        </div>
                        <div className="w-full h-[45%] bg-zinc-300 relative shrink-0 z-0">
                            <div className="absolute inset-0 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
                        </div>
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full px-6 z-30">
                            <SmartEl slideIndex={index} field="titulo">
                                <TextWrapper as="h2" field="titulo" className="font-black leading-[0.8] tracking-tighter uppercase whitespace-pre-line text-white drop-shadow-2xl" style={{ fontFamily: titleFont, fontSize: `${70 * sTitle}px` }}>
                                    {slideData.titulo}
                                </TextWrapper>
                            </SmartEl>
                            <SmartEl slideIndex={index} field="texto_apoio" className="mt-4">
                                <TextWrapper as="p" field="texto_apoio" className="text-[#1a1a1a] font-black tracking-[0.2em] text-[12px] uppercase bg-white inline-block px-4 py-1.5 shadow-xl" style={{ fontFamily: titleFont }}>
                                    {slideData.texto_apoio}
                                </TextWrapper>
                            </SmartEl>
                        </div>
                    </div>
                );

            case 'cover-27':
                return (
                    <div className="w-full h-full flex flex-col overflow-hidden relative" style={{ backgroundColor: bgBase }}>
                        <div className="absolute inset-0 z-0 bg-zinc-800" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 85%)' }}>
                            <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
                        </div>
                        <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-center w-full">
                                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                                    <Sparkles className="w-4 h-4 fill-current" />
                                </div>
                                <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white font-bold text-[9px] tracking-widest uppercase" style={{ fontFamily: titleFont }}>Novo</div>
                            </div>
                            <div className="flex flex-col items-end text-right mt-auto mb-10">
                                <SmartEl slideIndex={index} field="texto_apoio" className="mb-2">
                                    <TextWrapper as="span" field="texto_apoio" className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-[10px]" style={{ fontFamily: titleFont }}>
                                        {slideData.texto_apoio}
                                    </TextWrapper>
                                </SmartEl>
                                <SmartEl slideIndex={index} field="titulo" className="w-full">
                                    <TextWrapper as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-[0.85] tracking-tighter uppercase whitespace-pre-line" style={{ fontFamily: titleFont, fontSize: `${60 * sTitle}px` }}>
                                        {slideData.titulo}
                                    </TextWrapper>
                                </SmartEl>
                            </div>
                            <div className="flex items-center gap-4 border-t-2 pt-4" style={{ borderColor: gradientColor1 }}>
                                <span className="font-bold tracking-widest text-[9px] uppercase" style={{ color: gradientColor1, fontFamily: titleFont }}>
                                    @{brandHandle}
                                </span>
                                <div className="flex-1 h-px bg-zinc-300" />
                                <span className="font-bold text-[9px] uppercase" style={{ fontFamily: titleFont }}>2026</span>
                            </div>
                        </div>
                    </div>
                );

            case 'cover':
                return (
                    <div className="relative w-full h-full bg-[#080808] flex flex-col overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[55%] overflow-hidden">
                            {data.imageUrl ? (
                                <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${data.imageUrl})`, backgroundPosition: `center ${data.imagePosition ?? 50}%` }} />
                            ) : (
                                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center opacity-50"><ImageIcon className="w-8 h-8 text-zinc-700" /></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/10 to-transparent pointer-events-none" />
                        </div>
                        <div className="flex-1 mt-[55%] p-10 flex flex-col justify-between relative" style={{ backgroundColor: gradientColor1 }}>
                            <div className="absolute -top-24 left-10">
                                <SmartEl slideIndex={index} field="titulo">
                                    <h2
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleSlideTextChange(index, 'titulo', e.currentTarget.innerText)}
                                        className="font-outfit font-black text-white tracking-tighter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] whitespace-pre-line outline-none"
                                        style={{ fontSize: `${120 * sTitle}px`, lineHeight: 0.8 }}
                                    >
                                        {data.titulo}
                                    </h2>
                                </SmartEl>
                            </div>
                            <div className="mt-12">
                                <SmartEl slideIndex={index} field="texto_apoio">
                                    <p
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleSlideTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                                        className="font-playfair italic text-white max-w-[320px] mb-6 outline-none"
                                        style={{ fontSize: `${30 * sText}px`, lineHeight: 1.1 }}
                                    >
                                        {data.texto_apoio}
                                    </p>
                                </SmartEl>
                                <div className="w-20 h-[3px] bg-white/50" />
                            </div>
                            <div className="flex justify-between items-end pb-4 pointer-events-none">
                                <span className="font-outfit font-bold text-[10px] tracking-[0.5em] text-white/40 uppercase">Instagram Ready</span>
                                <div className="flex items-center gap-3 bg-black/20 px-6 py-3 rounded-2xl backdrop-blur-2xl border border-white/10">
                                    <span className="text-[11px] font-outfit font-black text-white tracking-widest uppercase">Deslizar</span>
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'content-split':
                return (
                    <div className="w-full h-full bg-[#050505] flex flex-col p-10 pb-16 relative">
                        <SlideHeader index={index + 1} total={slideCount} />
                        <div className="flex-1 flex flex-col justify-center pt-10">
                            <SmartEl slideIndex={index} field="imagem" className="relative w-full h-60 rounded-[2rem] overflow-hidden mb-8 ring-1 ring-white/10 shadow-2xl">
                                {data.imageUrl ? (
                                    <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${data.imageUrl})`, backgroundPosition: `center ${data.imagePosition ?? 50}%` }} />
                                ) : (
                                    <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center opacity-50"><ImageIcon className="w-8 h-8 text-zinc-700" /></div>
                                )}
                            </SmartEl>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[2px] w-8" style={{ backgroundColor: gradientColor1 }} />
                                <SmartEl slideIndex={index} field="tag">
                                    <span
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleSlideTextChange(index, 'tag', e.currentTarget.innerText)}
                                        className="font-outfit font-bold text-[11px] tracking-[0.4em] uppercase outline-none"
                                        style={{ color: gradientColor1 }}
                                    >
                                        {data.tag || 'TAG'}
                                    </span>
                                </SmartEl>
                            </div>
                            <SmartEl slideIndex={index} field="titulo" className="mb-6">
                                <h2
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleSlideTextChange(index, 'titulo', e.currentTarget.innerText)}
                                    className="font-outfit font-black text-white tracking-tighter outline-none"
                                    style={{ fontSize: `${32 * sTitle}px`, lineHeight: 1.1 }}
                                >
                                    {data.titulo}
                                </h2>
                            </SmartEl>
                            <SmartEl slideIndex={index} field="texto_apoio">
                                <p
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleSlideTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                                    className="font-playfair text-zinc-400 outline-none antialiased"
                                    style={{ fontSize: `${18 * sText}px`, lineHeight: 1.6 }}
                                >
                                    {data.texto_apoio}
                                </p>
                            </SmartEl>
                        </div>
                        <SlideFooterPlaceholder />
                    </div>
                );

            case 'big-number':
                return (
                    <div className="w-full h-full bg-[#050505] flex flex-col p-10 pb-16 relative overflow-hidden">
                        <SlideHeader index={index + 1} total={slideCount} />
                        <div className="flex-1 flex flex-col justify-center relative z-10 pt-8">
                            <SmartEl slideIndex={index} field="titulo" className="flex items-baseline mb-[-10px]">
                                <span
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleSlideTextChange(index, 'titulo', e.currentTarget.innerText)}
                                    className="font-outfit font-black text-white tracking-tighter leading-none outline-none"
                                    style={{ fontSize: `${130 * sTitle}px` }}
                                >
                                    {data.titulo}
                                </span>
                            </SmartEl>
                            <SmartEl slideIndex={index} field="tag" className="mb-8">
                                <div className="px-6 py-2 inline-block self-start rounded-md shadow-2xl" style={{ backgroundColor: gradientColor1 }}>
                                    <span
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleSlideTextChange(index, 'tag', e.currentTarget.innerText)}
                                        className="font-outfit font-bold text-white text-[12px] tracking-[0.3em] uppercase outline-none block"
                                    >
                                        {data.tag || 'LABEL'}
                                    </span>
                                </div>
                            </SmartEl>
                            <SmartEl slideIndex={index} field="texto_apoio" className="mb-10 max-w-[95%]">
                                <p
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleSlideTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                                    className="font-playfair text-zinc-300 outline-none"
                                    style={{ fontSize: `${20 * sText}px`, lineHeight: 1.6 }}
                                >
                                    {data.texto_apoio}
                                </p>
                            </SmartEl>
                            <SmartEl slideIndex={index} field="imagem" className="w-full h-40 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative">
                                {data.imageUrl ? (
                                    <div className="w-full h-full bg-cover grayscale" style={{ backgroundImage: `url(${data.imageUrl})`, backgroundPosition: `center ${data.imagePosition ?? 50}%` }} />
                                ) : (
                                    <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center opacity-50"><ImageIcon className="w-8 h-8 text-zinc-700" /></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                            </SmartEl>
                        </div>
                        <SlideFooterPlaceholder />
                    </div>
                );

            case 'quote':
                return (
                    <div className="w-full h-full bg-white flex flex-col p-16 pb-20 text-black items-center justify-center text-center relative">
                        <Quote className="absolute top-24 w-56 h-56 -z-0 pointer-events-none" style={{ color: `${gradientColor1}15` }} fill="currentColor" />
                        <div className="w-16 h-1.5 mb-12 relative z-10" style={{ backgroundColor: gradientColor1 }} />
                        <SmartEl slideIndex={index} field="titulo" className="mb-12 relative z-10 w-full">
                            <h2
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleSlideTextChange(index, 'titulo', e.currentTarget.innerText)}
                                className="font-playfair italic font-bold text-zinc-900 tracking-tight outline-none"
                                style={{ fontSize: `${36 * sTitle}px`, lineHeight: 1.2 }}
                            >
                                "{data.titulo}"
                            </h2>
                        </SmartEl>
                        <SmartEl slideIndex={index} field="texto_apoio" className="relative z-10">
                            <span
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleSlideTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                                className="font-outfit font-black text-[12px] tracking-[0.4em] uppercase text-zinc-400 outline-none block"
                            >
                                — {data.texto_apoio} —
                            </span>
                        </SmartEl>
                        <SlideHeader index={index + 1} total={slideCount} dark />
                        <SlideFooterPlaceholder />
                    </div>
                );

            case 'comparison':
                return (
                    <div className="w-full h-full bg-[#050505] flex flex-col p-10 pb-20">
                        <SlideHeader index={index + 1} total={slideCount} />
                        <div className="flex-1 flex flex-col justify-center pt-8">
                            <SmartEl slideIndex={index} field="titulo" className="mb-10">
                                <h2
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleSlideTextChange(index, 'titulo', e.currentTarget.innerText)}
                                    className="font-outfit font-black text-white tracking-tighter outline-none"
                                    style={{ fontSize: `${32 * sTitle}px` }}
                                >
                                    {data.titulo}
                                </h2>
                            </SmartEl>
                            <div className="space-y-4">
                                {(data.items || [{ label: 'A', value: 'B', highlight: false }]).map((item, i) => (
                                    <div key={i} className={`flex justify-between items-center p-6 rounded-[1.5rem] border transition-all duration-500 ${item.highlight ? 'shadow-xl' : 'bg-white/5 border-white/5 opacity-40'}`} style={item.highlight ? { backgroundColor: `${gradientColor1}15`, borderColor: `${gradientColor1}40` } : {}}>
                                        <div className="flex flex-col gap-0.5 w-full">
                                            <span
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => handleSlideItemChange(index, i, 'label', e.currentTarget.innerText)}
                                                className={`font-outfit font-black text-[10px] tracking-widest uppercase outline-none block ${!item.highlight ? 'text-zinc-500' : ''}`}
                                                style={item.highlight ? { color: gradientColor1 } : {}}
                                            >
                                                {item.label}
                                            </span>
                                            <span
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => handleSlideItemChange(index, i, 'value', e.currentTarget.innerText)}
                                                className={`font-playfair text-lg outline-none block ${item.highlight ? 'text-white font-bold' : 'text-zinc-400 italic'}`}
                                            >
                                                {item.value}
                                            </span>
                                        </div>
                                        {item.highlight && <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: gradientColor1 }} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SlideFooterPlaceholder />
                    </div>
                );

            case 'list':
                return (
                    <div className="w-full h-full bg-[#050505] flex flex-col p-10 pb-20 relative">
                        <SlideHeader index={index + 1} total={slideCount} />
                        <div className="flex-1 flex flex-col justify-center pt-8">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-12 h-12 border rounded-[1rem] flex items-center justify-center shrink-0 pointer-events-none" style={{ backgroundColor: `${gradientColor1}15`, borderColor: `${gradientColor1}30` }}>
                                    <CheckCircle2 className="w-7 h-7" style={{ color: gradientColor1 }} />
                                </div>
                                <SmartEl slideIndex={index} field="titulo" className="w-full">
                                    <h2
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleSlideTextChange(index, 'titulo', e.currentTarget.innerText)}
                                        className="font-outfit font-black text-white tracking-tighter leading-none outline-none"
                                        style={{ fontSize: `${30 * sTitle}px` }}
                                    >
                                        {data.titulo}
                                    </h2>
                                </SmartEl>
                            </div>
                            <div className="space-y-8">
                                {(data.items || [{ label: 'Item', text: 'Text' }]).map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="font-outfit font-black text-base opacity-30 transition-opacity pointer-events-none" style={{ color: gradientColor1 }}>0{i + 1}</div>
                                        <div className="flex-1 border-b border-white/10 pb-4">
                                            <h4
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => handleSlideItemChange(index, i, 'label', e.currentTarget.innerText)}
                                                className="font-outfit font-bold text-white text-[14px] uppercase tracking-[0.2em] mb-2 outline-none block"
                                            >
                                                {item.label}
                                            </h4>
                                            <p
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => handleSlideItemChange(index, i, 'text', e.currentTarget.innerText)}
                                                className="font-playfair text-zinc-400 text-base leading-snug outline-none block"
                                            >
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SlideFooterPlaceholder />
                    </div>
                );

            case 'cta':
                return (
                    <div className="w-full h-full flex flex-col p-16 items-center justify-center text-center text-white relative overflow-hidden" style={{ backgroundColor: gradientColor1 }}>
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] rotate-12 border-[1px] border-white/40" />
                        </div>

                        <div className="w-20 h-20 bg-black rounded-[1.5rem] flex items-center justify-center mb-10 rotate-6 shadow-2xl relative z-10 pointer-events-none">
                            <Zap className="w-10 h-10" style={{ color: gradientColor1 }} fill="currentColor" />
                        </div>

                        <SmartEl slideIndex={index} field="titulo" className="mb-6 relative z-10 w-full">
                            <h2
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleSlideTextChange(index, 'titulo', e.currentTarget.innerText)}
                                className="font-outfit font-black text-white leading-[0.95] tracking-tighter outline-none"
                                style={{ fontSize: `${36 * sTitle}px` }}
                            >
                                {data.titulo}
                            </h2>
                        </SmartEl>
                        <SmartEl slideIndex={index} field="texto_apoio" className="mb-12 relative z-10">
                            <p
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleSlideTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                                className="font-playfair text-white/90 leading-relaxed max-w-[340px] italic outline-none block"
                                style={{ fontSize: `${20 * sText}px` }}
                            >
                                {data.texto_apoio}
                            </p>
                        </SmartEl>

                        <SmartEl slideIndex={index} field="tag" className="w-full max-w-[300px] relative z-10">
                            <button className="w-full py-6 bg-white font-outfit font-black text-[12px] uppercase tracking-[0.4em] rounded-2xl shadow-2xl hover:bg-black hover:text-white transition-all duration-500 pointer-events-none" style={{ color: gradientColor1 }}>
                                {data.tag || 'CLIQUE AQUI'}
                            </button>
                        </SmartEl>

                        <div className="mt-16 flex gap-10 items-center text-white/50 relative z-10 pointer-events-none">
                            <div className="flex flex-col items-center gap-2 group transition-all hover:scale-110">
                                <Heart className="w-5 h-5" />
                                <span className="text-[8px] font-black tracking-widest uppercase">Love</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 group transition-all hover:scale-110">
                                <Bookmark className="w-5 h-5" />
                                <span className="text-[8px] font-black tracking-widest uppercase">Save</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 group transition-all hover:scale-110">
                                <Share2 className="w-5 h-5" />
                                <span className="text-[8px] font-black tracking-widest uppercase">Share</span>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] text-zinc-100 font-sans flex flex-col overflow-hidden selection:bg-rose-500/30">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${titleFont.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&family=${textFont.replace(/ /g, '+')}:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700&display=swap');
        .font-playfair { font-family: '${textFont}', serif; }
        .font-outfit { font-family: '${titleFont}', sans-serif; }
        .cubic-bezier-custom { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #18181b; border-radius: 20px; }
      `}</style>

            {/* CARROSSEL STUDIO HEADER */}
            <nav className="h-20 border-b border-white/5 bg-[#080808]/80 backdrop-blur-3xl px-8 flex flex-wrap items-center justify-between z-[100] relative">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-outfit font-black text-base transition-transform group-hover:rotate-6 text-white" style={{ backgroundColor: gradientColor1, boxShadow: `0 0 20px ${gradientColor1}40` }}>A</div>
                        <div className="flex flex-col">
                            <span className="font-outfit font-black text-lg tracking-tighter leading-none uppercase text-white">Alice <span style={{ color: gradientColor1 }}>Studio</span></span>
                            <span className="text-[10px] font-bold text-zinc-500 tracking-[0.4em] mt-1 uppercase">v3.2 Final</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 mt-4 sm:mt-0">
                    <div className="hidden lg:flex items-center gap-4 px-6 py-2 bg-white/5 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-outfit font-black text-white uppercase tracking-widest">Safe Zones Verified</span>
                    </div>
                </div>
            </nav>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

                {/* SIDEBAR CONFIGURAÇÕES (Mantido estilo premium escuro) */}
                <aside className="w-full lg:w-96 border-r border-white/5 bg-[#050505] p-6 lg:p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar z-40 relative">

                    <div className="space-y-6">
                        <h3 className="text-[11px] font-black text-zinc-500 tracking-[0.3em] uppercase flex items-center gap-2">
                            <Settings2 className="w-4 h-4" style={{ color: gradientColor1 }} />
                            Alice Setup
                        </h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Handle (Arroba)</label>
                                    <input
                                        type="text"
                                        value={brandHandle}
                                        onChange={(e) => setBrandHandle(e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none transition-colors"
                                        style={{ focusBorderColor: gradientColor1 }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Selo Verified</label>
                                    <button
                                        onClick={() => setIsVerified(!isVerified)}
                                        className={`w-full h-[38px] rounded-lg border text-[11px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 ${isVerified ? 'border-[#DE1E4D]/50 text-[#DE1E4D]' : 'bg-[#0A0A0A] border-white/10 text-zinc-500'}`}
                                        style={isVerified ? { backgroundColor: `${gradientColor1}20`, borderColor: `${gradientColor1}50`, color: gradientColor1 } : {}}
                                    >
                                        <BadgeCheck className="w-4 h-4" /> {isVerified ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Cor Destaque</label>
                                    <div className="flex gap-2 items-center bg-[#0A0A0A] border border-white/10 p-1.5 rounded-lg">
                                        <input
                                            type="color" value={gradientColor1} onChange={(e) => setGradientColor1(e.target.value)}
                                            className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                                        />
                                        <span className="text-[10px] font-mono text-zinc-400 uppercase">{gradientColor1}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Fontes Extras</label>
                                    <button onClick={() => alert('As fontes primárias da Alice (Outfit/Playfair) já estão otimizadas para conversão. Não estrague meu design, Mr. Gustavo.')} className="w-full h-[38px] bg-[#0A0A0A] border border-white/10 rounded-lg text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                                        Bloqueado
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] text-zinc-500 mb-1 font-bold uppercase tracking-wider">Tamanho Título: {titleSizeScale}%</label>
                                <input
                                    type="range" min="50" max="150" value={titleSizeScale} onChange={(e) => setTitleSizeScale(e.target.value)}
                                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    style={{ accentColor: gradientColor1 }}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] text-zinc-500 mb-1 font-bold uppercase tracking-wider">Tamanho Texto: {textSizeScale}%</label>
                                <input
                                    type="range" min="50" max="150" value={textSizeScale} onChange={(e) => setTextSizeScale(e.target.value)}
                                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    style={{ accentColor: gradientColor1 }}
                                />
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full" />

                        <div className="space-y-4">
                            <label className="block text-[11px] font-black text-zinc-500 tracking-[0.3em] uppercase flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" style={{ color: gradientColor1 }} />
                                Master Prompt
                            </label>
                            <textarea
                                className="w-full h-32 bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-zinc-200 placeholder-zinc-700 focus:outline-none transition-all resize-none text-sm font-playfair italic"
                                placeholder="Descreva a estratégia. Ex: 5 motivos polêmicos sobre a confeitaria gourmet tradicional..."
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                style={{ focusBorderColor: gradientColor1 }}
                            />

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Slides a Gerar</label>
                                    <span className="font-bold px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${gradientColor1}20`, color: gradientColor1 }}>{slideCount}</span>
                                </div>
                                <input
                                    type="range" min="4" max="10" value={slideCount} onChange={(e) => setSlideCount(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    style={{ accentColor: gradientColor1 }}
                                />
                            </div>

                            {error && (
                                <div className="mt-4 p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-400 text-xs font-mono">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <button
                                onClick={generateCarousel}
                                disabled={isGenerating}
                                className="mt-6 w-full text-white font-outfit font-black text-[12px] tracking-[0.3em] uppercase py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:brightness-110"
                                style={{ backgroundColor: gradientColor1 }}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Processando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" /> Start AI
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* WORKSPACE CENTRAL (Visualização e Edição) */}
                <main className="flex-1 bg-[#030303] relative flex flex-col p-4 md:p-8 overflow-y-auto overflow-x-hidden">

                    {slides.length === 0 && !isGenerating ? (
                        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-3xl text-zinc-700">
                            <Target className="w-16 h-16 mb-4 opacity-20" />
                            <p className="font-outfit font-black uppercase tracking-widest text-xs">Waiting for prompt, Mr. Gustavo.</p>
                        </div>
                    ) : isGenerating ? (
                        <div className="flex-1 flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-[#050505] shadow-inner">
                            <Loader2 className="w-12 h-12 animate-spin mb-6" style={{ color: gradientColor1 }} />
                            <p className="font-outfit text-zinc-500 text-xs uppercase tracking-widest animate-pulse font-black">Alice is writing...</p>
                        </div>
                    ) : (
                        <div className="space-y-6 max-w-full">
                            <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center bg-[#080808] border border-white/5 p-4 rounded-2xl shadow-xl z-20 relative">
                                <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                                    <span className="text-white font-outfit font-black tracking-widest bg-white/5 px-4 py-2 rounded-lg text-[10px] uppercase border border-white/10">{slides.length} Slides</span>

                                    <div className="flex bg-[#0A0A0A] rounded-xl p-1 border border-white/5">
                                        <button
                                            onClick={() => setViewMode('visual')}
                                            className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-colors ${viewMode === 'visual' ? 'bg-white/10 text-white' : 'text-zinc-600 hover:text-zinc-300'}`}
                                        >
                                            Preview Final
                                        </button>
                                        <button
                                            onClick={() => setViewMode('text')}
                                            className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-colors ${viewMode === 'text' ? 'bg-white/10 text-white' : 'text-zinc-600 hover:text-zinc-300'}`}
                                        >
                                            Estrutura/Texto
                                        </button>
                                    </div>

                                    {viewMode === 'visual' && (
                                        <div className="flex bg-[#0A0A0A] rounded-xl p-1 border border-white/5 ml-auto xl:ml-0">
                                            <button
                                                onClick={() => setShowMetrics(!showMetrics)}
                                                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all flex items-center gap-1.5 ${showMetrics ? 'text-white' : 'bg-transparent text-zinc-600 hover:text-zinc-300 border border-transparent'}`}
                                                style={showMetrics ? { backgroundColor: `${gradientColor1}20`, borderColor: `${gradientColor1}50`, color: gradientColor1 } : {}}
                                                title="Mostrar dimensões reais para padronização"
                                            >
                                                <Ruler className="w-3.5 h-3.5" /> Raio-X
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 w-full xl:w-auto">
                                    {viewMode === 'visual' && slides.length > 0 && (
                                        <button
                                            onClick={exportAllToPNG}
                                            disabled={isExporting}
                                            className="flex-1 xl:flex-none flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-white py-2.5 px-6 rounded-xl transition-all disabled:opacity-50 font-black whitespace-nowrap shadow-xl hover:brightness-110"
                                            style={{ backgroundColor: gradientColor1 }}
                                        >
                                            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                            {isExporting ? 'Exporting...' : 'Export High-Res'}
                                        </button>
                                    )}
                                    <button
                                        onClick={copyAll}
                                        className="flex-1 xl:flex-none flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest bg-[#0A0A0A] hover:bg-white/5 text-white py-2.5 px-6 rounded-xl transition-colors whitespace-nowrap border border-white/10 font-bold"
                                    >
                                        {copiedIndex === 'all' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                        {copiedIndex === 'all' ? 'Copiado!' : 'Copiar Textos'}
                                    </button>
                                </div>
                            </div>

                            {viewMode === 'text' ? (
                                <div className="grid gap-6 max-w-4xl mx-auto">
                                    {slides.map((slide, index) => (
                                        <div key={index} className="bg-[#080808] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative group">
                                            <div className="bg-[#050505] px-6 py-4 border-b border-white/5 flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black text-white rotate-3 shadow-lg" style={{ backgroundColor: gradientColor1 }}>
                                                        {slide.slide}
                                                    </div>
                                                    <span className="text-[10px] font-bold text-zinc-500 border border-white/10 px-3 py-1 rounded-md bg-[#0A0A0A] uppercase tracking-widest">
                                                        {slide.layout}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6 md:p-8 space-y-5">
                                                <label className="block">
                                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2 block">Headline / Título</span>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-[#0A0A0A] border border-white/5 hover:border-white/10 focus:outline-none rounded-xl px-5 py-4 text-lg font-outfit font-black text-white transition-all"
                                                        value={slide.titulo || ''}
                                                        onChange={(e) => handleSlideTextChange(index, 'titulo', e.target.value)}
                                                        style={{ focusBorderColor: gradientColor1 }}
                                                    />
                                                </label>
                                                <label className="block">
                                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2 block">Texto / Copy</span>
                                                    <textarea
                                                        className="w-full bg-[#0A0A0A] border border-white/5 hover:border-white/10 focus:outline-none rounded-xl px-5 py-4 text-zinc-300 font-playfair italic transition-all resize-y min-h-[100px]"
                                                        value={slide.texto_apoio || ''}
                                                        onChange={(e) => handleSlideTextChange(index, 'texto_apoio', e.target.value)}
                                                        style={{ focusBorderColor: gradientColor1 }}
                                                    />
                                                </label>
                                                {slide.tag !== undefined && (
                                                    <label className="block">
                                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2 block">Tag / Label</span>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-[#0A0A0A] border border-white/5 hover:border-white/10 focus:outline-none rounded-xl px-5 py-3 text-sm font-outfit text-white transition-all"
                                                            value={slide.tag || ''}
                                                            onChange={(e) => handleSlideTextChange(index, 'tag', e.target.value)}
                                                        />
                                                    </label>
                                                )}
                                                {slide.items && (
                                                    <div className="p-4 border border-white/5 rounded-xl bg-[#0A0A0A]/50">
                                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3 block">Itens do Slide (Visualmente Editáveis)</span>
                                                        <p className="text-xs text-zinc-600 font-mono">Dica da Alice: Para arrays/listas complexas, altere os textos diretamente no modo "Preview Final" clicando neles. É mais seguro.</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-[#050505] px-6 py-5 border-t border-white/5 flex items-start gap-4">
                                                <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-zinc-600" />
                                                <div className="w-full">
                                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Visual (Sugestão IA)</p>
                                                    {slide.sugestao_visual && <p className="text-xs text-zinc-500 font-mono mb-4">{slide.sugestao_visual}</p>}

                                                    <div className="flex flex-wrap gap-3">
                                                        <button
                                                            onClick={() => generateImageWithAI(index, slide.sugestao_visual || "premium luxury object")}
                                                            disabled={loadingImages[index]}
                                                            className="flex items-center gap-2 text-[10px] uppercase tracking-widest py-2 px-4 rounded-lg transition-colors font-bold border"
                                                            style={{ backgroundColor: `${gradientColor1}15`, color: gradientColor1, borderColor: `${gradientColor1}30` }}
                                                        >
                                                            {loadingImages[index] ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                                                            {loadingImages[index] ? 'Generating...' : 'Generate AI Image'}
                                                        </button>

                                                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest bg-[#0A0A0A] hover:bg-white/5 text-zinc-400 py-2 px-4 rounded-lg transition-colors font-bold cursor-pointer border border-white/10">
                                                            <Upload className="w-3.5 h-3.5" />
                                                            Upload Manual
                                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(index, e)} />
                                                        </label>
                                                    </div>

                                                    {slide.imageUrl && (
                                                        <div className="mt-5 pt-4 border-t border-white/5 w-full max-w-sm">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ajuste Fundo (Y-Axis)</label>
                                                                <span className="text-[10px] text-zinc-500 font-mono">{slide.imagePosition ?? 50}%</span>
                                                            </div>
                                                            <input
                                                                type="range" min="0" max="100" value={slide.imagePosition ?? 50}
                                                                onChange={(e) => handleImagePosition(index, e.target.value)}
                                                                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                                                style={{ accentColor: gradientColor1 }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex gap-10 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory items-center min-h-[600px]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                                    {slides.map((slide, index) => {
                                        const cardWidth = 400; // Visualização um pouco maior
                                        const cardHeight = 500; // Proporção 4:5

                                        return (
                                            <div key={`visual-${index}`} className="flex flex-col gap-6 shrink-0 snap-center transition-all duration-300">

                                                <div id={`slide-card-${index}`} style={{ width: cardWidth, height: cardHeight }} className="shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] rounded-[2.5rem] overflow-hidden shrink-0 bg-black ring-1 ring-white/10 relative">
                                                    {renderVisualCard(slide, index)}
                                                </div>

                                                <div className="flex flex-col gap-3 w-[400px]">
                                                    <div className="flex gap-3 w-full">
                                                        <label className="flex-1 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest bg-[#0A0A0A] hover:bg-white/5 text-zinc-400 py-3.5 px-4 rounded-xl transition-colors font-bold cursor-pointer border border-white/10 shadow-lg">
                                                            <Upload className="w-4 h-4" />
                                                            Foto
                                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(index, e)} />
                                                        </label>

                                                        <button
                                                            onClick={() => copyToClipboard(`Headline: ${slide.titulo}\nTexto: ${slide.texto_apoio}`, index)}
                                                            className="flex-[2] flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-white py-3.5 px-4 rounded-xl transition-all font-black shadow-lg hover:brightness-110"
                                                            style={{ backgroundColor: gradientColor1 }}
                                                        >
                                                            {copiedIndex === index ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                            {copiedIndex === index ? 'Copiado!' : 'Copiar Textos'}
                                                        </button>
                                                    </div>

                                                    {Object.keys(slide.positions || {}).length > 0 && (
                                                        <button
                                                            onClick={() => resetSlidePositions(index)}
                                                            className="w-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest bg-red-950/20 hover:bg-red-900/40 text-red-500 py-3 rounded-xl transition-colors border border-red-900/30 font-bold"
                                                        >
                                                            <RotateCcw className="w-3.5 h-3.5" />
                                                            Reset Positions
                                                        </button>
                                                    )}

                                                    {slide.imageUrl && (
                                                        <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-4">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Image Offset Y</label>
                                                                <span className="text-[10px] text-zinc-600 font-mono">{slide.imagePosition ?? 50}%</span>
                                                            </div>
                                                            <input
                                                                type="range" min="0" max="100" value={slide.imagePosition ?? 50}
                                                                onChange={(e) => handleImagePosition(index, e.target.value)}
                                                                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                                                style={{ accentColor: gradientColor1 }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}