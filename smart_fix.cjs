const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/components/slides/split-variants.jsx');
let code = fs.readFileSync(file, 'utf8');

// 1. Fix slideIndex globally
code = code.replace(/<SlideHeader\s+\{\.\.\.props\}\s+index=\{index \+ 1\}/g, '<SlideHeader {...props} slideIndex={index} index={index + 1}');

// Helper to replace precisely inside a variant function
function replaceInVariant(variantName, regex, replacement) {
  const startRegex = new RegExp(`export function ${variantName}\\(props\\)\\s*{`);
  const startIndex = code.search(startRegex);
  if (startIndex === -1) {
    if(variantName === 'SplitVariant5'){
      const regexV5 = /export function SplitVariant5\([^)]*\)\s*{/;
      const startV5 = code.search(regexV5);
      if(startV5 !== -1){
        let endIndex = code.indexOf('// ════════════', startV5);
        if (endIndex === -1) endIndex = code.length;
        let block = code.substring(startV5, endIndex);
        block = block.replace(regex, replacement);
        code = code.substring(0, startV5) + block + code.substring(endIndex);
        return;
      }
    }
    console.log(`Variant ${variantName} not found.`);
    return;
  }
  let endIndex = code.indexOf('// ════════════', startIndex);
  if (endIndex === -1) endIndex = code.length;
  
  let block = code.substring(startIndex, endIndex);
  block = block.replace(regex, replacement);
  code = code.substring(0, startIndex) + block + code.substring(endIndex);
}

// VARIANT 5
replaceInVariant('SplitVariant5',
  /<div className="w-full h-full bg-\[#E5E5E5\] flex flex-col overflow-hidden text-black border-8 border-black relative">([\s\S]*?)<div className="h-1\/2 w-full bg-black p-8 text-white relative flex flex-col justify-end border-b-8 border-black">/,
  `<div className="w-full h-full bg-[#E5E5E5] relative overflow-hidden text-black">$1<div className="absolute inset-0 flex flex-col border-8 border-black z-0 pointer-events-none"></div><div className="absolute inset-0 flex flex-col z-10"><div className="h-1/2 w-full bg-black p-8 text-white relative flex flex-col justify-end border-b-8 border-black">`
);
replaceInVariant('SplitVariant5',
  /(<ImageBg data=\{data\} className="absolute inset-0" \/>\s*<\/SmartField>\s*<\/div>\s*)(<\/div>\s*\);\s*})/,
  `$1</div>$2`
);

// VARIANT 13
replaceInVariant('SplitVariant13',
  /<div className="w-full h-full p-6 flex flex-col overflow-hidden border-8 bg-white relative" style=\{\{ borderColor: brandColor \}\}>\s*(<SlideHeader[\s\S]*?\/>)\s*<div className="flex justify-between items-end mb-4 shrink-0 mt-4">/,
  `<div className="w-full h-full relative overflow-hidden bg-white">\n      $1\n      <div className="absolute inset-0 p-6 flex flex-col border-8 pointer-events-none" style={{ borderColor: brandColor }}></div><div className="absolute inset-0 p-6 flex flex-col pointer-events-none [&>*]:pointer-events-auto">\n      <div className="flex justify-between items-end mb-4 shrink-0 mt-4">`
);
replaceInVariant('SplitVariant13',
  /(<SmartField field="texto_apoio"[\s\S]*?<\/SmartField>\s*)(<\/div>\s*\);\s*})/,
  `$1</div>$2`
);

// VARIANT 18
replaceInVariant('SplitVariant18',
  /(<div className="w-full h-full flex flex-col overflow-hidden bg-white relative">\s*)<SmartField field="imagem" \{\.\.\.sp\} className="w-full h-\[50%\] bg-zinc-300 relative shrink-0 border-b-8 overflow-hidden" style=\{\{ borderColor: brandColor \}\}>\s*<ImageBg data=\{data\} className="absolute inset-0" \/>\s*<div className="absolute top-6 left-6 right-6 mix-blend-difference opacity-90 z-20">\s*(<SlideHeader[\s\S]*?\/>)\s*<\/div>\s*<\/SmartField>/,
  `$1$2\n      <SmartField field="imagem" {...sp} className="w-full h-[50%] bg-zinc-300 relative shrink-0 border-b-8 overflow-hidden" style={{ borderColor: brandColor }}>\n        <ImageBg data={data} className="absolute inset-0" />\n      </SmartField>`
);

// VARIANT 21
replaceInVariant('SplitVariant21',
  /<div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-\[#FAFAFA\]">\s*<div className="relative z-20">\s*(<SlideHeader[\s\S]*?\/>)\s*<\/div>\s*<div className="flex-1 flex flex-col z-20 min-h-0 pt-10">/,
  `<div className="w-full h-full relative overflow-hidden bg-[#FAFAFA]">\n      $1\n      <div className="absolute inset-0 p-6 flex flex-col z-10 pointer-events-none [&>*]:pointer-events-auto">\n      <div className="flex-1 flex flex-col z-20 min-h-0 pt-10">`
);
replaceInVariant('SplitVariant21',
  /(<SmartField field="texto_apoio"[\s\S]*?<\/SmartField>\s*)(<\/div>\s*\);\s*})/,
  `$1</div>$2`
);

// VARIANT 22
replaceInVariant('SplitVariant22',
  /(<div className="w-full h-full flex overflow-hidden bg-\[#FAFAFA\] relative">)\s*(<div className="w-14 h-full shrink-0 flex flex-col items-center py-6 shadow-xl z-20" style=\{\{ backgroundColor: brandColor \}\}>[\s\S]*?<\/div>)\s*<div className="flex-1 flex flex-col h-full p-6 relative z-10 pb-8">\s*<div className="relative z-20 -ml-2 mb-4 shrink-0">\s*(<SlideHeader[\s\S]*?\/>)\s*<\/div>/,
  `$1\n      $3\n      $2\n      <div className="flex-1 flex flex-col h-full p-6 relative z-10 pb-8">`
);

// VARIANT 23
replaceInVariant('SplitVariant23',
  /<div className="w-full h-full p-6 flex flex-col relative overflow-hidden bg-\[#FAFAFA\]">\s*<div className="relative z-20 mix-blend-difference opacity-90">\s*(<SlideHeader[\s\S]*?\/>)\s*<\/div>\s*<div className="relative z-10 bg-white\/95 backdrop-blur-md/,
  `<div className="w-full h-full relative overflow-hidden bg-[#FAFAFA]">\n      $1\n      <div className="absolute inset-0 p-6 flex flex-col pointer-events-none [&>*]:pointer-events-auto">\n      <div className="relative z-10 bg-white/95 backdrop-blur-md`
);
replaceInVariant('SplitVariant23',
  /(<SmartField field="texto_apoio"[\s\S]*?<\/SmartField>\s*)(<\/div>\s*\);\s*})/,
  `$1</div>$2`
);

// VARIANT 26
replaceInVariant('SplitVariant26',
  /<div className="w-full h-full p-6 flex flex-col relative overflow-hidden bg-\[#FAFAFA\]">\s*<div className="absolute top-10 right-\[-40px\] w-64 h-64 rounded-full opacity-\[0\.06\] z-0 pointer-events-none" style=\{\{ backgroundColor: brandColor \}\} \/>\s*<div className="relative z-20">\s*(<SlideHeader[\s\S]*?\/>)\s*<\/div>\s*<div className="flex-1 flex flex-col z-10 min-h-0 pt-8 w-\[85%\] pr-4 relative">/,
  `<div className="w-full h-full relative overflow-hidden bg-[#FAFAFA]">\n      $1\n      <div className="absolute inset-0 p-6 flex flex-col border border-transparent pointer-events-none [&>*]:pointer-events-auto">\n        <div className="absolute top-10 right-[-40px] w-64 h-64 rounded-full opacity-[0.06] z-0 pointer-events-none" style={{ backgroundColor: brandColor }} />\n        <div className="flex-1 flex flex-col z-10 min-h-0 pt-8 w-[85%] pr-4 relative">`
);
replaceInVariant('SplitVariant26',
  /(<SmartField field="texto_apoio"[\s\S]*?<\/SmartField>\s*)(<\/div>\s*\);\s*})/,
  `$1</div>$2`
);

fs.writeFileSync(file, code);
console.log('Fixed precisely.');
