const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/slides');
const files = ['cover-variants.jsx', 'bignumber-variants.jsx', 'quote-variants.jsx'];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix BrandTag invocations
  content = content.replace(/brandHandle=\{brandHandle\}/g, 'brandHandle={brandHandle} brandAvatar={brandAvatar}');
  // quote-variants uses handle={brandHandle}
  content = content.replace(/handle=\{brandHandle\}/g, 'handle={brandHandle} brandAvatar={brandAvatar}');
  
  // Fix signature of Variant components (they receive props and destructure them)
  content = content.replace(/brandHandle,\s*brandColor/g, 'brandHandle, brandAvatar, brandColor');

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Done replacing brandAvatar in variants!');
