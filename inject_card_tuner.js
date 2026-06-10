const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

const tunerHtml = `
<!-- CARD TUNER UI -->
<div id="card-tuner" style="position: fixed; top: 20px; right: 20px; width: 320px; background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 8px; z-index: 99999; font-family: sans-serif; font-size: 14px;">
    <h3 style="margin-top: 0; color: #fff;">Card Tuner</h3>
    
    <label>Card Width (px): <span id="val-c-w">580</span></label>
    <input type="range" id="c-w" min="200" max="1000" value="580" style="width: 100%; margin-bottom: 10px;">
    
    <label>Card Height (px): <span id="val-c-h">260</span></label>
    <input type="range" id="c-h" min="100" max="800" value="260" style="width: 100%; margin-bottom: 10px;">
    
    <label>Left Pos (px): <span id="val-c-l">40</span></label>
    <input type="range" id="c-l" min="0" max="1000" value="40" style="width: 100%; margin-bottom: 10px;">
    
    <label>Bottom Pos (px): <span id="val-c-b">40</span></label>
    <input type="range" id="c-b" min="0" max="1000" value="40" style="width: 100%; margin-bottom: 10px;">
    
    <label>Title Font Size (px): <span id="val-c-ts">28</span></label>
    <input type="range" id="c-ts" min="10" max="100" value="28" style="width: 100%; margin-bottom: 10px;">
    
    <label>Desc Font Size (px): <span id="val-c-ds">16</span></label>
    <input type="range" id="c-ds" min="10" max="50" value="16" style="width: 100%; margin-bottom: 10px;">

    <div style="margin-top: 15px; padding: 10px; background: #333; word-break: break-all; user-select: all;" id="tuner-result">
        width: 580px; height: 260px; left: 40px; bottom: 40px; title: 28px; desc: 16px;
    </div>
</div>

<script>
    const card = document.getElementById('curation-card');
    const title = document.getElementById('curation-title');
    const desc = document.getElementById('curation-desc');

    const result = document.getElementById('tuner-result');

    function bindSlider(id, valId, cssProp, targetEl, isSuffixPx) {
        const slider = document.getElementById(id);
        const valDisp = document.getElementById(valId);
        if(!slider || !targetEl) return;
        
        slider.addEventListener('input', (e) => {
            const v = e.target.value;
            valDisp.textContent = v;
            targetEl.style[cssProp] = isSuffixPx ? v + 'px' : v;
            updateResult();
        });
    }

    function updateResult() {
        const w = document.getElementById('c-w').value;
        const h = document.getElementById('c-h').value;
        const l = document.getElementById('c-l').value;
        const b = document.getElementById('c-b').value;
        const ts = document.getElementById('c-ts').value;
        const ds = document.getElementById('c-ds').value;

        result.textContent = \`width: \${w}px; height: \${h}px; left: \${l}px; bottom: \${b}px; title: \${ts}px; desc: \${ds}px;\`;
    }

    // Wait for elements to be available
    setTimeout(() => {
        const cardTarget = document.getElementById('curation-card');
        const titleTarget = document.getElementById('curation-title');
        const descTarget = document.getElementById('curation-desc');

        if(cardTarget && titleTarget && descTarget) {
            bindSlider('c-w', 'val-c-w', 'width', cardTarget, true);
            bindSlider('c-h', 'val-c-h', 'height', cardTarget, true);
            bindSlider('c-l', 'val-c-l', 'left', cardTarget, true);
            bindSlider('c-b', 'val-c-b', 'bottom', cardTarget, true);
            bindSlider('c-ts', 'val-c-ts', 'fontSize', titleTarget, true);
            bindSlider('c-ds', 'val-c-ds', 'fontSize', descTarget, true);
        }
    }, 1000);
</script>
<!-- /CARD TUNER UI -->
</body>`;

if (!html.includes('id="card-tuner"')) {
    html = html.replace('</body>', tunerHtml);
    fs.writeFileSync('product.html', html);
    console.log('Tuner injected!');
} else {
    console.log('Tuner already exists!');
}
