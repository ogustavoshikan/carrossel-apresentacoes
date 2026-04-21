const fs = require('fs');
let content = fs.readFileSync('src/components/slides/list-variants.jsx', 'utf8');

for (let i = 14; i <= 30; i++) {
  const regexStr = 'export function ListVariant' + i + '\\(props\\)\\s*\\{[\\s\\S]*?(?=export function ListVariant|$)';
  const regex = new RegExp(regexStr);
  const match = regex.exec(content);
  if (!match) continue;

  let body = match[0];

  const headerMatch = body.match(/\s*<SlideHeader[^>]*\/>/);
  if (!headerMatch) continue;

  let headerTag = headerMatch[0].trim();
  
  if (!headerTag.includes('slideIndex={index}')) {
      headerTag = headerTag.replace('<SlideHeader ', '<SlideHeader slideIndex={index} ');
  }

  body = body.replace(headerMatch[0], '');

  const returnRegex = /(return\\s*\\(\\s*)(<div[^>]*>)/;
  const returnMatch = returnRegex.exec(body);
  if (returnMatch) {
    let divTag = returnMatch[2];
    if (!divTag.includes('relative')) {
      divTag = divTag.replace('className="', 'className="relative ');
    }
    
    body = body.replace(returnRegex, returnMatch[1] + divTag + '\n      ' + headerTag);
  }
  
  content = content.replace(match[0], body);
}

fs.writeFileSync('src/components/slides/list-variants.jsx', content);
