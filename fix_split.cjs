const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'components', 'slides', 'split-variants.jsx');

let code = fs.readFileSync(file, 'utf8');

console.log('Original SlideHeader count:', (code.match(/<SlideHeader /g) || []).length);

// Replacing the SlideHeader {...props} correctly
code = code.replace(/<SlideHeader\s+\{\.\.\.props\}\s+index=\{index \+ 1\}/g, '<SlideHeader {...props} slideIndex={index} index={index + 1}');

console.log('After SlideHeader replace count:', (code.match(/<SlideHeader /g) || []).length);
console.log('New SlideHeaders with slideIndex:', (code.match(/slideIndex=\{index\}/g) || []).length);

// Fixing relative classes
const regex = /export function SplitVariant(?:[7-9]|1[0-9]|2[0-6])\s*\([^)]*\)\s*\{[\s\S]*?return\s*\(\s*(<div[^>]*className="([^"]+)"[^>]*>)/g;
let match;
let toReplace = [];
while ((match = regex.exec(code)) !== null) {
  const fullDiv = match[1];
  const classNames = match[2];
  if (!classNames.split(' ').includes('relative')) {
    const newClassNames = classNames + ' relative';
    const newDiv = fullDiv.replace(classNames, newClassNames);
    toReplace.push({ old: fullDiv, new: newDiv });
  }
}

toReplace.forEach(rep => {
  code = code.replace(rep.old, rep.new);
});

console.log(`Replaced relative class names in ${toReplace.length} occurrences.`);

fs.writeFileSync(file, code);
console.log('Done.');
