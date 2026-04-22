const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Gustavo\\apps\\Alice Studio - v3.2 Final\\src\\components\\slides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  let content = fs.readFileSync(path.join(dir, f), 'utf-8');
  
  // Replace `onTextChange,` with `onTextChange, selectedElement, onSelectElement,`
  // Also for `onItemChange,`
  content = content.replace(/onTextChange,\n/g, 'onTextChange,\n  selectedElement,\n  onSelectElement,\n');
  content = content.replace(/onItemChange,\n/g, 'onItemChange,\n  selectedElement,\n  onSelectElement,\n');
  
  // Inject into SmartElement
  content = content.replace(/<SmartElement([\s\S]*?)field="([^"]+)"([\s\S]*?)onActionStart={onActionStart}/g, (match, p1, fieldName, p3) => {
    // Avoid double injection if already injected
    if (match.includes('isSelected=')) return match;
    
    return `<SmartElement${p1}field="${fieldName}"${p3}onActionStart={onActionStart}\n            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === '${fieldName}'}\n            onSelectElement={onSelectElement}`;
  });

  fs.writeFileSync(path.join(dir, f), content);
  console.log('Updated ' + f);
});
