const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// Ensure they are wrapped. They already are in .hero-card-position-wrapper
// Let's remove any old tuner just in case
html = html.replace(/<div id="temp-tuner"[^>]*>[\s\S]*?<\/div>/g, '');
html = html.replace(/<!-- HERO TUNER UI -->[\s\S]*?<!-- \/HERO TUNER UI -->/g, '');

const tunerHtml = `
<!-- HERO TUNER UI -->
<div id="hero-tuner" style="position: fixed; bottom: 20px; right: 20px; width: 340px; background: rgba(0,0,0,0.85); color: white; padding: 20px; border-radius: 8px; z-index: 99999; font-family: sans-serif; font-size: 13px;">
    <h3 style="margin-top: 0; color: #fff; font-size: 16px;">Hero Group Position Tuner</h3>
    
    <label>Group Top (px): <span id="val-ht">330</span></label>
    <input type="range" id="t-ht" min="0" max="1000" value="330" style="width: 100%; margin-bottom: 12px;">

    <label>Group Left (px): <span id="val-hl">660</span></label>
    <input type="range" id="t-hl" min="0" max="1500" value="660" style="width: 100%; margin-bottom: 12px;">

    <div style="margin-top: 15px; padding: 10px; background: #333; word-break: break-all; user-select: all;" id="hero-tuner-result">
        hero-top: 330px; hero-left: 660px;
    </div>
</div>

<script>
    const heroWrapper = document.querySelector('.hero-card-position-wrapper');
    const resultBox = document.getElementById('hero-tuner-result');
    
    const htSlider = document.getElementById('t-ht');
    const htVal = document.getElementById('val-ht');
    const hlSlider = document.getElementById('t-hl');
    const hlVal = document.getElementById('val-hl');

    function updateResult() {
        resultBox.textContent = \`hero-top: \${htSlider.value}px; hero-left: \${hlSlider.value}px;\`;
    }

    if(htSlider && heroWrapper) {
        htSlider.addEventListener('input', (e) => {
            const v = e.target.value;
            htVal.textContent = v;
            heroWrapper.style.top = v + 'px';
            updateResult();
        });
        hlSlider.addEventListener('input', (e) => {
            const v = e.target.value;
            hlVal.textContent = v;
            heroWrapper.style.left = v + 'px';
            updateResult();
        });
        
        // init
        if(heroWrapper.style.top) {
            let t = parseInt(heroWrapper.style.top);
            if(!isNaN(t)) { htSlider.value = t; htVal.textContent = t; }
        }
        if(heroWrapper.style.left) {
            let l = parseInt(heroWrapper.style.left);
            if(!isNaN(l)) { hlSlider.value = l; hlVal.textContent = l; }
        }
        updateResult();
    }
</script>
<!-- /HERO TUNER UI -->
</body>`;

html = html.replace('</body>', tunerHtml);
fs.writeFileSync('product.html', html);
console.log('Injected Hero Tuner UI');
