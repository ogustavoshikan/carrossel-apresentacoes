const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'components', 'slides', 'split-variants.jsx');
let code = fs.readFileSync(file, 'utf8');

// Looking for the end of Variant 5
const regex = /(export function SplitVariant5[\s\S]*?<div className="h-1\/2 w-full flex relative">[\s\S]*?<\/SmartField>\s*)(      <\/div>\s*    <\/div>\s*  \);\s*\})/g;

if (regex.test(code)) {
  code = code.replace(regex, `$1      </div>\n$2`);
  fs.writeFileSync(file, code);
  console.log("Fixed var 5 div.");
} else {
  console.log("Could not find regex match.");
}
