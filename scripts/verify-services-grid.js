const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exitCode = 1;
  }
}

assert(
  !html.includes('grid.style.gridTemplateColumns'),
  'Services grid should not set inline gridTemplateColumns in JavaScript.'
);

assert(
  /@media\s*\(max-width:\s*900px\)[\s\S]*?\.services-grid\s*{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(html),
  'Mobile services grid should use two minmax columns inside the max-width: 900px media query.'
);

if (!process.exitCode) {
  console.log('Services grid responsive rules verified.');
}
