const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

let wrapperStart = html.indexOf('<div class="hero-card-position-wrapper"');
if (wrapperStart !== -1) {
    let wrapperEnd = html.indexOf('>', wrapperStart);
    let tagHtml = html.substring(wrapperStart, wrapperEnd + 1);
    tagHtml = tagHtml.replace(/left:\s*\d+px;/, 'left: 1268px;');
    tagHtml = tagHtml.replace(/top:\s*\d+px;/, 'top: 595px;');
    html = html.substring(0, wrapperStart) + tagHtml + html.substring(wrapperEnd + 1);
    console.log('Updated position');
} else {
    console.log('wrapper not found');
}

// Remove Tuner UI
html = html.replace(/<!-- HERO TUNER UI -->[\s\S]*?<!-- \/HERO TUNER UI -->/g, '');

fs.writeFileSync('product.html', html);
console.log('Removed tuner and saved product.html');
