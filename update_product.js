const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// Replace coordinates
html = html.replace(
  'style="position: absolute; left: 660px; top: 330px; width: 600px; height: 304px; z-index: 10;"',
  'style="position: absolute; left: 1280px; top: 600px; width: 600px; height: 304px; z-index: 10;"'
);

// Remove the tuner
const startIdx = html.indexOf('<div id="temp-tuner"');
if (startIdx !== -1) {
  const endIdx = html.indexOf('</div>\n</body>', startIdx);
  if (endIdx !== -1) {
    html = html.substring(0, startIdx) + html.substring(endIdx + 7);
  }
}

fs.writeFileSync('product.html', html);
console.log('Update successful!');
