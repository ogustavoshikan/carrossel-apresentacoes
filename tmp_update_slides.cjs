const fs = require('fs');
const path = 'src/components/slides/cover-variants.jsx';
let content = fs.readFileSync(path, 'utf8');

const newVariants = `// ═══════════════════════════════════════════════════════════
// VARIANTE 28
// ═══════════════════════════════════════════════════════════
export function CoverVariant28({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex relative overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="w-[60%] h-full p-8 pb-16 flex flex-col justify-between relative z-10">
        <div className="shrink-0">
          <span className="font-bold tracking-[0.15em] text-[10px] text-zinc-500 uppercase font-outfit">
            @{brandHandle || 'studio'}
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <SmartField field="titulo" {...sp} className="mb-6 shrink-0">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-[0.9] tracking-tighter uppercase font-outfit" style={{ fontSize: \`\${34 * sTitle}px\` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
          <SmartField field="texto_apoio" {...sp} className="shrink-0">
            <TextWrapper {...tw} as="p" field="texto_apoio" className="text-zinc-700 leading-snug font-medium font-outfit" style={{ fontSize: \`\${16 * sText}px\` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 flex items-center gap-2 z-20">
        <span className="font-bold text-[10px] uppercase tracking-widest text-[#1a1a1a] font-outfit">Arraste para o lado e descubra</span>
        <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
      </div>
      <div className="absolute right-0 top-0 w-[45%] h-full bg-zinc-200 z-0 overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 29
// ═══════════════════════════════════════════════════════════
export function CoverVariant29({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="absolute top-8 left-8 text-[10px] text-zinc-500 font-bold tracking-widest uppercase z-20 font-outfit">
        @{brandHandle || 'studio'}
      </div>
      <div className="w-full h-full flex pt-16 pb-8 pl-6 pr-6">
        <div className="w-[52%] h-full pb-8 pr-4">
          <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-200 relative shadow-lg">
            <ImageBg data={data} className="absolute inset-0" />
          </div>
        </div>
        <div className="w-[48%] h-full flex flex-col justify-center pl-2">
          <SmartField field="titulo" {...sp} className="mb-6">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-[0.9] tracking-tighter uppercase font-outfit" style={{ fontSize: \`\${32 * sTitle}px\` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
          <div className="flex gap-2 items-start mb-6">
            <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: brandColor }} />
            <SmartField field="tag" {...sp}>
              <TextWrapper {...tw} as="p" field="tag" className="text-zinc-600 leading-snug font-medium font-outfit" style={{ fontSize: \`\${14 * sText}px\` }}>
                {slideData.tag}
              </TextWrapper>
            </SmartField>
          </div>
          <SmartField field="texto_apoio" {...sp}>
            <TextWrapper {...tw} as="p" field="texto_apoio" className="text-[#1a1a1a] font-bold leading-snug font-outfit" style={{ fontSize: \`\${15 * sText}px\` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
      <div className="absolute bottom-8 left-8 flex items-center gap-2">
        <span className="font-bold text-[10px] uppercase tracking-widest text-zinc-500 font-outfit">Arraste</span>
        <ArrowRight className="w-4 h-4 text-zinc-500" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 30
// ═══════════════════════════════════════════════════════════
export function CoverVariant30({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex relative overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="absolute left-0 top-0 bottom-0 w-[30%] bg-zinc-300 z-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="w-full h-full pl-[30%] flex flex-col z-10">
        <div className="p-6 shrink-0">
          <span className="font-bold tracking-[0.15em] text-[10px] text-zinc-500 uppercase font-outfit">
            @{brandHandle || 'studio'}
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-center px-8 text-center">
          <SmartField field="titulo" {...sp} className="mb-8">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-[0.95] tracking-tighter uppercase font-outfit" style={{ fontSize: \`\${30 * sTitle}px\` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
          <SmartField field="texto_apoio" {...sp} className="flex flex-col gap-4 text-left pl-4 border-l-2" style={{ borderColor: brandColor }}>
            <TextWrapper {...tw} as="div" field="texto_apoio" className="text-zinc-700 leading-snug font-medium whitespace-pre-wrap font-outfit" style={{ fontSize: \`\${14 * sText}px\` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
        <div className="p-6 shrink-0 flex justify-end">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#1a1a1a]/20">
            <Heart className="w-4 h-4 text-[#1a1a1a]" />
            <MessageCircle className="w-4 h-4 text-[#1a1a1a]" />
            <Send className="w-4 h-4 text-[#1a1a1a]" />
            <Bookmark className="w-4 h-4 text-[#1a1a1a] ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 31
// ═══════════════════════════════════════════════════════════
export function CoverVariant31({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="w-[55%] h-full p-6 flex flex-col justify-center relative z-10">
        <span className="font-bold tracking-[0.15em] text-[10px] text-zinc-500 uppercase absolute top-6 left-6 font-outfit">
          @{brandHandle || 'studio'}
        </span>
        <SmartField field="titulo" {...sp} className="mb-6 mt-6 shrink-0">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black leading-[0.9] tracking-tighter uppercase font-outfit" style={{ color: brandColor, fontSize: \`\${32 * sTitle}px\` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <div className="flex flex-col gap-4 flex-1 overflow-hidden min-h-0 justify-center">
          <div className="flex gap-3 items-start shrink-0">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: \`\${brandColor}20\`, color: brandColor }}>
              <Star className="w-3 h-3" fill="currentColor" />
            </div>
            <SmartField field="item1" {...sp}>
               <TextWrapper {...tw} as="p" field="item1" className="text-zinc-800 leading-snug font-medium font-outfit" style={{ fontSize: \`\${13 * sText}px\` }}>
                  {slideData.item1 || 'Entrega com segurança, sem coração na mão durante o trajeto.'}
               </TextWrapper>
            </SmartField>
          </div>
          <div className="flex gap-3 items-start shrink-0">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: \`\${brandColor}20\`, color: brandColor }}>
              <Star className="w-3 h-3" fill="currentColor" />
            </div>
            <SmartField field="item2" {...sp}>
               <TextWrapper {...tw} as="p" field="item2" className="text-zinc-800 leading-snug font-medium font-outfit" style={{ fontSize: \`\${13 * sText}px\` }}>
                  {slideData.item2 || 'Ganhe a confiança do cliente e valorize seu trabalho sempre.'}
               </TextWrapper>
            </SmartField>
          </div>
          <div className="flex gap-3 items-start shrink-0">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: \`\${brandColor}20\`, color: brandColor }}>
              <Star className="w-3 h-3" fill="currentColor" />
            </div>
            <SmartField field="item3" {...sp}>
               <TextWrapper {...tw} as="p" field="item3" className="text-zinc-800 leading-snug font-medium font-outfit" style={{ fontSize: \`\${13 * sText}px\` }}>
                  {slideData.item3 || 'Foque em crescer e faturar trabalhando diretamente de casa.'}
               </TextWrapper>
            </SmartField>
          </div>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2 shrink-0">
          <span className="font-bold text-[9px] uppercase tracking-widest text-zinc-500 font-outfit">Arraste para o lado e descubra</span>
          <ArrowRight className="w-3 h-3 text-zinc-500" />
        </div>
      </div>
      <div className="w-[45%] h-full bg-zinc-200 relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 32
// ═══════════════════════════════════════════════════════════
export function CoverVariant32({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="absolute inset-0 z-0 flex flex-col opacity-20 pointer-events-none select-none overflow-hidden leading-[0.85] text-center pt-8">
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: \`\${60 * sTitle}px\` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: \`\${60 * sTitle}px\` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: \`\${60 * sTitle}px\` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: \`\${60 * sTitle}px\` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: \`\${60 * sTitle}px\` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: \`\${60 * sTitle}px\` }}>{slideData.titulo}</div>
      </div>
      <div className="relative z-10 flex-1 flex flex-col justify-end p-6">
        <div className="w-full h-[55%] rounded-t-3xl rounded-b-xl overflow-hidden shadow-2xl bg-zinc-200 relative border-4 border-white mb-4">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg flex justify-between items-center">
          <SmartField field="texto_apoio" {...sp} className="flex-1">
            <TextWrapper {...tw} as="p" field="texto_apoio" className="font-bold text-[#1a1a1a] leading-tight font-outfit" style={{ fontSize: \`\${12 * sText}px\` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
          <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center ml-4 shadow-md" style={{ backgroundColor: brandColor }}>
            <Store className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}`;

const componentsReplacement = `export const COVER_VARIANT_COMPONENTS = {
  1: CoverVariant1,
  2: CoverVariant2,
  3: CoverVariant3,
  4: CoverVariant4,
  5: CoverVariant5,
  6: CoverVariant6,
  7: CoverVariant7,
  8: CoverVariant8,
  9: CoverVariant9,
  10: CoverVariant10,
  11: CoverVariant11,
  12: CoverVariant12,
  13: CoverVariant13,
  14: CoverVariant14,
  15: CoverVariant15,
  16: CoverVariant16,
  17: CoverVariant17,
  18: CoverVariant18,
  19: CoverVariant19,
  20: CoverVariant20,
  21: CoverVariant21,
  22: CoverVariant22,
  23: CoverVariant23,
  24: CoverVariant24,
  25: CoverVariant25,
  26: CoverVariant26,
  27: CoverVariant27,
  28: CoverVariant28,
  29: CoverVariant29,
  30: CoverVariant30,
  31: CoverVariant31,
  32: CoverVariant32,
};`;

const metaReplacement = `export const COVER_VARIANT_META = [
  { id: 0, name: 'Original', description: 'Layout padrão' },
  { id: 1, name: 'Color Split', description: 'Imagem + bloco de cor' },
  { id: 2, name: 'Cinemático', description: 'Full-bleed com gradient' },
  { id: 3, name: 'Blur Editorial', description: 'Fundo blur + barra de acento' },
  { id: 4, name: 'Moldura', description: 'Estilo editorial emoldurado' },
  { id: 5, name: 'Rounded Split', description: 'Bloco arredondado de cor' },
  { id: 6, name: 'Arco', description: 'Imagem em arco + texto central' },
  { id: 7, name: 'Polaroid', description: 'Card estilo foto instantânea' },
  { id: 8, name: 'Acento Lateral', description: 'Borda lateral colorida' },
  { id: 9, name: 'Spotlight', description: 'Card branco com watermark' },
  { id: 10, name: 'Bottom Minimal', description: 'Texto inferior minimalista' },
  { id: 11, name: 'Luxury Frame', description: 'Moldura branca com sombra profunda' },
  { id: 12, name: 'Diagonal Slice', description: 'Corte diagonal dinâmico' },
  { id: 13, name: 'Bold Overlay', description: 'Título com mix-blend e badge' },
  { id: 14, name: 'Top Block', description: 'Bloco de cor superior e imagem' },
  { id: 15, name: 'Center Card', description: 'Imagem superior e card central' },
  { id: 16, name: 'Bottom Gradient', description: 'Imagem full com gradient colorido' },
  { id: 17, name: 'Minimal Side', description: 'Divisão lateral limpa' },
  { id: 18, name: 'Glassmorphism Center', description: 'Card com blur sobre glow' },
  { id: 19, name: 'Arch Featured', description: 'Imagem em arco com badge' },
  { id: 20, name: 'Rotating Polaroid', description: 'Polaroid com padrão radial' },
  { id: 21, name: 'Diagonal Edge', description: 'Corte diagonal com título gigante' },
  { id: 22, name: 'Header Minimal', description: 'Título uppercase com glow lateral' },
  { id: 23, name: 'Vertical Split', description: 'Split vertical com handle rotacionado' },
  { id: 24, name: 'Grid Process', description: 'Estilo técnico com grid e badge' },
  { id: 25, name: 'Frosted Float', description: 'Card flutuante com blur intenso' },
  { id: 26, name: 'Overlay Volume', description: 'Bloco superior blend sobre imagem' },
  { id: 27, name: 'Slanted New', description: 'Recorte diagonal com ícone Sparkles' },
  { id: 28, name: 'Right Image Text Left', description: 'Imagem à direita com texto à esquerda' },
  { id: 29, name: 'Framed Left Image', description: 'Imagem emoldurada com tags à direita' },
  { id: 30, name: 'Social Icons Overlay', description: 'Layout com barra de ícones de redes sociais' },
  { id: 31, name: 'List Bullet Stars', description: 'Imagem com lista de destaques' },
  { id: 32, name: 'Repeated Text Background', description: 'Fundo com texto repetido e card inferior' },
];`;

const oldComponentsRegex = /export const COVER_VARIANT_COMPONENTS = \{[\s\S]*?\};/;
const oldMetaRegex = /export const COVER_VARIANT_META = \[[\s\S]*?\];/;

const registerCommentIndex = content.lastIndexOf('// ═══════════════════════════════════════════════════════════\\n// REGISTRO DE VARIANTES');
if (registerCommentIndex !== -1) {
  content = content.slice(0, registerCommentIndex) + newVariants + '\n\n' + content.slice(registerCommentIndex);
} else {
  // alternative match if newlines are different
  const altIndex = content.lastIndexOf('export const COVER_VARIANT_COMPONENTS');
  if (altIndex !== -1) {
     content = content.slice(0, altIndex) + newVariants + '\n\n' + content.slice(altIndex);
  }
}

content = content.replace(oldComponentsRegex, componentsReplacement);
content = content.replace(oldMetaRegex, metaReplacement);

fs.writeFileSync(path, content, 'utf8');
console.log('Done!');
