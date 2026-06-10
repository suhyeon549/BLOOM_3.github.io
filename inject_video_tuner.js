const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

const tunerHtml = `
<!-- VIDEO TUNER UI -->
<div id="video-tuner" style="position: fixed; top: 20px; right: 20px; width: 320px; background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 8px; z-index: 99999; font-family: sans-serif; font-size: 14px;">
    <h3 style="margin-top: 0; color: #fff;">Video Position Tuner</h3>
    
    <label>X Position (%): <span id="val-v-x">50</span>%</label>
    <input type="range" id="v-x" min="0" max="100" value="50" style="width: 100%; margin-bottom: 15px;">
    
    <label>Y Position (%): <span id="val-v-y">50</span>%</label>
    <input type="range" id="v-y" min="0" max="100" value="50" style="width: 100%; margin-bottom: 15px;">
    
    <div style="margin-top: 15px; padding: 10px; background: #333; word-break: break-all; user-select: all;" id="video-tuner-result">
        object-position: 50% 50%;
    </div>
</div>

<script>
    const video = document.getElementById('section-3-video');
    const resultBox = document.getElementById('video-tuner-result');
    const xSlider = document.getElementById('v-x');
    const ySlider = document.getElementById('v-y');
    const xVal = document.getElementById('val-v-x');
    const yVal = document.getElementById('val-v-y');

    function updateVideoPos() {
        if(!video) return;
        const x = xSlider.value;
        const y = ySlider.value;
        const posStr = x + '% ' + y + '%';
        
        xVal.textContent = x;
        yVal.textContent = y;
        video.style.objectPosition = posStr;
        
        resultBox.textContent = 'object-position: ' + posStr + ';';
    }

    if(xSlider && ySlider) {
        xSlider.addEventListener('input', updateVideoPos);
        ySlider.addEventListener('input', updateVideoPos);
        
        // ensure object-fit is cover
        setTimeout(() => {
            if(video) video.style.objectFit = 'cover';
        }, 1000);
    }
</script>
<!-- /VIDEO TUNER UI -->
</body>`;

if (!html.includes('id="video-tuner"')) {
    html = html.replace('</body>', tunerHtml);
    fs.writeFileSync('product.html', html);
    console.log('Video tuner injected!');
} else {
    console.log('Video tuner already exists!');
}
