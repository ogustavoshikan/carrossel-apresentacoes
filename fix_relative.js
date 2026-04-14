const fs = require('fs');
const file = 'src/components/slides/split-variants.jsx';
let code = fs.readFileSync(file, 'utf8');

// Find all SplitVar components
const regex = /export function SplitVariant\d+\s*\([^)]*\)\s*\{[\s\S]*?return\s*\(\s*(<div[^>]*className="([^"]+)"[^>]*>)/g;
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

fs.writeFileSync(file, code);
console.log('Fixed relatives.');
