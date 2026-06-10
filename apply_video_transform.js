const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// 1. Update video style
const targetVideoStart = '<video id="section-3-video"';
let idx = html.indexOf(targetVideoStart);

if (idx !== -1) {
    let endIdx = html.indexOf('>', idx);
    let videoTag = html.substring(idx, endIdx + 1);
    
    // Add transform to style
    let newVideoTag;
    if (videoTag.includes('transform:')) {
        newVideoTag = videoTag.replace(/transform:[^;]+;/, 'transform: scale(1.25) translate(0%, -16%);');
    } else if (videoTag.includes('style="')) {
        newVideoTag = videoTag.replace('style="', 'style="transform: scale(1.25) translate(0%, -16%); ');
    }
    
    if (newVideoTag) {
        html = html.substring(0, idx) + newVideoTag + html.substring(endIdx + 1);
        console.log('Video transform applied!');
    } else {
        console.log('Failed to parse video style.');
    }
} else {
    console.log('Video not found.');
}

// 2. Remove Video Tuner UI V2
let tunerStart = html.indexOf('<!-- VIDEO TUNER UI V2 -->');
let tunerEnd = html.indexOf('<!-- /VIDEO TUNER UI V2 -->');
if (tunerStart !== -1 && tunerEnd !== -1) {
    html = html.substring(0, tunerStart) + html.substring(tunerEnd + '<!-- /VIDEO TUNER UI V2 -->'.length);
    console.log('Tuner UI removed!');
}

fs.writeFileSync('product.html', html);
