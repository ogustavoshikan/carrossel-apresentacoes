const fs = require('fs');

const file = 'src/components/slides/comparison-variants.jsx';
let content = fs.readFileSync(file, 'utf8');

const standardProps = `data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={props.brandHandle || brandHandle} showBrandHandle={props.showBrandHandle || showBrandHandle} brandColor={props.brandColor || brandColor} isVerified={props.isVerified || isVerified} showSlideCounter={props.showSlideCounter || showSlideCounter} slideCounterPosition={props.slideCounterPosition || slideCounterPosition}`;

// V10
content = content.replace(
  /<div className="absolute top-0 left-0 w-full p-8 z-50 w-full text-left">/g,
  '<div className="absolute top-0 left-0 w-full p-10 z-50 text-left">'
);

// V11
content = content.replace(
  /<div className="absolute top-0 left-0 w-full p-8 z-50">/g,
  '<div className="absolute top-0 left-0 w-full p-10 z-50">'
);

// V13
content = content.replace(
  /className="p-6 pb-2 shrink-0 text-center relative z-10 bg-white"/g,
  'className="p-10 pb-2 shrink-0 text-center relative z-10 bg-white"'
);
content = content.replace(
  /<SlideHeader \{\.\.\.props\} index=\{index \+ 1\} total=\{slideCount\} \/>/g,
  `<SlideHeader ${standardProps} />`
);

// V14 (Needs SlideHeader injected)
content = content.replace(
  /<div className="h-1\/2 w-full bg-zinc-900 p-8 flex flex-col justify-center text-center pb-12">/,
  `<div className="absolute top-0 left-0 w-full p-10 z-50">\n        <SlideHeader ${standardProps} dark />\n      </div>\n      <div className="h-1/2 w-full bg-zinc-900 p-8 flex flex-col justify-center text-center pb-12">`
);

// V15
content = content.replace(
  /<div className="w-full h-full p-8 flex flex-col overflow-hidden rounded-slide"/,
  '<div className="w-full h-full p-10 flex flex-col overflow-hidden rounded-slide"'
);

// V16 (Needs SlideHeader injected and title top adjusted)
content = content.replace(
  /<div className="absolute top-8 left-0 w-full z-30 px-6 flex justify-center">/,
  `<div className="absolute top-0 left-0 w-full p-10 z-50">\n        <SlideHeader ${standardProps} dark />\n      </div>\n      <div className="absolute top-24 left-0 w-full z-30 px-6 flex justify-center">`
);

// V17 (Needs SlideHeader injected)
content = content.replace(
  /<div className="absolute inset-0 flex flex-col p-8 z-10">/,
  `<div className="absolute top-0 left-0 w-full p-10 z-50">\n        <SlideHeader ${standardProps} dark />\n      </div>\n      <div className="absolute inset-0 flex flex-col p-8 z-10">`
);

// V18, 19, 22, 23, 24
content = content.replace(
  /<div className="absolute top-6 left-6 right-6">/g,
  '<div className="absolute top-0 left-0 w-full p-10 z-50">'
);
content = content.replace(
  /<SlideHeader \{\.\.\.props\} index=\{index \+ 1\} total=\{slideCount\} dark \/>/g,
  `<SlideHeader ${standardProps} dark />`
);

// V20
content = content.replace(
  /<div className="p-6 shrink-0 relative z-10">/,
  '<div className="p-10 shrink-0 relative z-10">'
);

// V21
content = content.replace(
  /<div className="w-full h-full flex flex-col overflow-hidden bg-black text-white p-8 rounded-slide">/,
  '<div className="w-full h-full flex flex-col overflow-hidden bg-black text-white p-10 rounded-slide">'
);

fs.writeFileSync(file, content);
console.log('Done modifying comparison-variants.jsx');
