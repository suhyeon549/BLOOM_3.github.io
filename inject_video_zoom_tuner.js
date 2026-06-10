const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

const tunerHtml = `
<!-- VIDEO TUNER UI V2 -->
<div id="video-tuner" style="position: fixed; top: 20px; right: 20px; width: 320px; background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 8px; z-index: 99999; font-family: sans-serif; font-size: 14px;">
    <h3 style="margin-top: 0; color: #fff;">Video Zoom & Pan Tuner</h3>
    
    <label>Zoom (Scale): <span id="val-v-s">1.0</span>x</label>
    <input type="range" id="v-s" min="1.0" max="3.0" step="0.05" value="1.0" style="width: 100%; margin-bottom: 15px;">

    <label>X Offset (%): <span id="val-v-x">0</span>%</label>
    <input type="range" id="v-x" min="-50" max="50" step="1" value="0" style="width: 100%; margin-bottom: 15px;">
    
    <label>Y Offset (%): <span id="val-v-y">0</span>%</label>
    <input type="range" id="v-y" min="-50" max="50" step="1" value="0" style="width: 100%; margin-bottom: 15px;">
    
    <div style="margin-top: 15px; padding: 10px; background: #333; word-break: break-all; user-select: all;" id="video-tuner-result">
        transform: scale(1.0) translate(0%, 0%);
    </div>
</div>

<script>
    const video = document.getElementById('section-3-video');
    const resultBox = document.getElementById('video-tuner-result');
    const sSlider = document.getElementById('v-s');
    const xSlider = document.getElementById('v-x');
    const ySlider = document.getElementById('v-y');
    const sVal = document.getElementById('val-v-s');
    const xVal = document.getElementById('val-v-x');
    const yVal = document.getElementById('val-v-y');

    function updateVideoPos() {
        if(!video) return;
        const s = parseFloat(sSlider.value).toFixed(2);
        const x = xSlider.value;
        const y = ySlider.value;
        
        sVal.textContent = s;
        xVal.textContent = x;
        yVal.textContent = y;
        
        const transformStr = \`scale(\${s}) translate(\${x}%, \${y}%)\`;
        video.style.transform = transformStr;
        
        resultBox.textContent = 'transform: ' + transformStr + ';';
    }

    if(sSlider && xSlider && ySlider) {
        sSlider.addEventListener('input', updateVideoPos);
        xSlider.addEventListener('input', updateVideoPos);
        ySlider.addEventListener('input', updateVideoPos);
    }
</script>
<!-- /VIDEO TUNER UI V2 -->
</body>`;

// Remove the old tuner if it exists
let tunerStart = html.indexOf('<!-- VIDEO TUNER UI -->');
let tunerEnd = html.indexOf('<!-- /VIDEO TUNER UI -->');
if (tunerStart !== -1 && tunerEnd !== -1) {
    html = html.substring(0, tunerStart) + html.substring(tunerEnd + '<!-- /VIDEO TUNER UI -->'.length);
}

// Also remove V2 if it exists
let tunerStart2 = html.indexOf('<!-- VIDEO TUNER UI V2 -->');
let tunerEnd2 = html.indexOf('<!-- /VIDEO TUNER UI V2 -->');
if (tunerStart2 !== -1 && tunerEnd2 !== -1) {
    html = html.substring(0, tunerStart2) + html.substring(tunerEnd2 + '<!-- /VIDEO TUNER UI V2 -->'.length);
}

// Inject new tuner
html = html.replace('</body>', tunerHtml);
fs.writeFileSync('product.html', html);
console.log('Video tuner V2 injected!');
