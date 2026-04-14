const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'components', 'slides', 'split-variants.jsx');

let code = fs.readFileSync(file, 'utf8');

const variantsToFix = ['SplitVariant13', 'SplitVariant21', 'SplitVariant23', 'SplitVariant26'];

variantsToFix.forEach(v => {
  const regex = new RegExp(`(export function ${v}\\([^\\)]*\\)\\s*\\{[\\s\\S]*?)(    <\\/div>\\s*)(  \\);\\s*\\})`);
  const match = code.match(regex);
  if (match) {
    code = code.replace(regex, `$1      </div>\n$2$3`);
  } else {
    console.log("Could not match ending for", v);
  }
});

fs.writeFileSync(file, code);
console.log('Fixed missing divs.');
