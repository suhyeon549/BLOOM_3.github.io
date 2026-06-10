const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// The curation-card
const cardRegex = /<div class="prod-fade-up step-01" id="curation-card" style="([^"]*?)width:\s*\d+px;([^"]*?)height:\s*\d+px;([^"]*?)"/g;
// We need to carefully replace the inline styles of #curation-card
let startIdx = html.indexOf('id="curation-card"');
if (startIdx !== -1) {
    let styleStart = html.indexOf('style="', startIdx);
    let styleEnd = html.indexOf('"', styleStart + 7);
    let styleStr = html.substring(styleStart + 7, styleEnd);

    // replace left, bottom, width, height
    styleStr = styleStr.replace(/width:\s*\d+px;/, 'width: 503px;');
    styleStr = styleStr.replace(/height:\s*\d+px;/, 'height: 275px;');
    styleStr = styleStr.replace(/left:\s*\d+px;/, 'left: 45px;');
    styleStr = styleStr.replace(/bottom:\s*\d+px;/, 'bottom: 141px;');

    html = html.substring(0, styleStart + 7) + styleStr + html.substring(styleEnd);
}

// The curation-title
let titleIdx = html.indexOf('id="curation-title"');
if (titleIdx !== -1) {
    let styleStart = html.indexOf('style="', titleIdx);
    let styleEnd = html.indexOf('"', styleStart + 7);
    let styleStr = html.substring(styleStart + 7, styleEnd);

    styleStr = styleStr.replace(/font-size:\s*\d+px;/, 'font-size: 34px;');
    
    html = html.substring(0, styleStart + 7) + styleStr + html.substring(styleEnd);
}

// The curation-desc
let descIdx = html.indexOf('id="curation-desc"');
if (descIdx !== -1) {
    let styleStart = html.indexOf('style="', descIdx);
    let styleEnd = html.indexOf('"', styleStart + 7);
    let styleStr = html.substring(styleStart + 7, styleEnd);

    styleStr = styleStr.replace(/font-size:\s*\d+px;/, 'font-size: 19px;');
    
    html = html.substring(0, styleStart + 7) + styleStr + html.substring(styleEnd);
}

fs.writeFileSync('product.html', html);
console.log('Restored product card values!');
