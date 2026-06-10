const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// 1. Update curation-card dimensions and position
// old string to search for: width: 580px; height: 260px; etc
let cardIdx = html.indexOf('id="curation-card" style="');
if (cardIdx !== -1) {
    let endStyle = html.indexOf('">', cardIdx);
    let styleStr = html.substring(cardIdx, endStyle);
    
    // Replace width
    styleStr = styleStr.replace(/width:\s*\d+px;/, 'width: 503px;');
    // Replace height
    styleStr = styleStr.replace(/height:\s*\d+px;/, 'height: 275px;');
    // Replace left
    styleStr = styleStr.replace(/left:\s*\d+px;/, 'left: 45px;');
    // Replace bottom
    styleStr = styleStr.replace(/bottom:\s*\d+px;/, 'bottom: 141px;');
    
    html = html.substring(0, cardIdx) + styleStr + html.substring(endStyle);
}

// 2. Update curation-title font size
let titleIdx = html.indexOf('id="curation-title" style="');
if (titleIdx !== -1) {
    let endStyle = html.indexOf('">', titleIdx);
    let styleStr = html.substring(titleIdx, endStyle);
    
    styleStr = styleStr.replace(/font-size:\s*\d+px;/, 'font-size: 34px;');
    
    html = html.substring(0, titleIdx) + styleStr + html.substring(endStyle);
}

// 3. Update curation-desc font size
let descIdx = html.indexOf('id="curation-desc" style="');
if (descIdx !== -1) {
    let endStyle = html.indexOf('">', descIdx);
    let styleStr = html.substring(descIdx, endStyle);
    
    styleStr = styleStr.replace(/font-size:\s*\d+px;/, 'font-size: 19px;');
    
    html = html.substring(0, descIdx) + styleStr + html.substring(endStyle);
}

// 4. Remove Card Tuner UI
let tunerStart = html.indexOf('<!-- CARD TUNER UI -->');
let tunerEnd = html.indexOf('<!-- /CARD TUNER UI -->');
if (tunerStart !== -1 && tunerEnd !== -1) {
    html = html.substring(0, tunerStart) + html.substring(tunerEnd + '<!-- /CARD TUNER UI -->'.length);
}

fs.writeFileSync('product.html', html);
console.log('Final values applied and tuner removed!');
