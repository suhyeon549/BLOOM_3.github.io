const fs = require('fs');
let html = fs.readFileSync('team.html', 'utf8');

// 1. Apply title top 161px
html = html.replace(/<p id="t-title"([^>]*?)style="([^"]*?)top:\s*\d+px;([^"]*?)"([^>]*?)>/, '<p id="t-title"$1style="$2top: 161px;$3"$4>');

// 2. Apply bottom tag margin 93px
// t-tags-2 margin-top is what we need to update
html = html.replace(/id="t-tags-2"\s+class="t-tags-cont"([^>]*?)style="([^"]*?)margin-top:\s*\d+px([^"]*?)"/g, 'id="t-tags-2" class="t-tags-cont"$1style="$2margin-top: 93px$3"');
// Wait, the id might be after class or before
html = html.replace(/<div id="t-tags-2" class="t-tags-cont"([^>]*?)style="([^"]*?)margin-top:\s*\d+px([^"]*?)"/g, '<div id="t-tags-2" class="t-tags-cont"$1style="$2margin-top: 93px$3"');
html = html.replace(/<div class="t-tags-cont" id="t-tags-2"([^>]*?)style="([^"]*?)margin-top:\s*\d+px([^"]*?)"/g, '<div class="t-tags-cont" id="t-tags-2"$1style="$2margin-top: 93px$3"');

// 3. Remove old Tuner UI V4
let tunerStart = html.indexOf('<!-- TEAM TUNER UI');
let tunerEnd = html.indexOf('<!-- /TEAM TUNER UI V4 -->');
if (tunerEnd === -1) tunerEnd = html.indexOf('<!-- /TEAM TUNER UI V3 -->');

if (tunerStart !== -1 && tunerEnd !== -1) {
    let endTagStr = html.substring(tunerEnd, tunerEnd + 50);
    let endLen = endTagStr.indexOf('-->') + 3;
    html = html.substring(0, tunerStart) + html.substring(tunerEnd + endLen);
}

// 4. Inject new Tuner UI V5
const tunerHtmlV5 = `
<!-- TEAM TUNER UI V5 -->
<div id="team-tuner" style="position: fixed; top: 20px; right: 20px; width: 340px; background: rgba(0,0,0,0.85); color: white; padding: 20px; border-radius: 8px; z-index: 99999; font-family: sans-serif; font-size: 13px;">
    <h3 style="margin-top: 0; color: #fff; font-size: 16px;">Profiles Height Tuner</h3>
    
    <label>Profiles Top (px): <span id="val-pt">320</span></label>
    <input type="range" id="t-pt" min="0" max="800" value="320" style="width: 100%; margin-bottom: 12px;">

    <div style="margin-top: 15px; padding: 10px; background: #333; word-break: break-all; user-select: all;" id="team-tuner-result">
        profiles-top: 320px;
    </div>
</div>

<script>
    const tProfiles = document.getElementById('t-profiles');
    const resultBox = document.getElementById('team-tuner-result');
    
    const ptSlider = document.getElementById('t-pt');
    const ptVal = document.getElementById('val-pt');

    if(ptSlider) {
        ptSlider.addEventListener('input', (e) => {
            const v = e.target.value;
            ptVal.textContent = v;
            if(tProfiles) tProfiles.style.top = v + 'px';
            resultBox.textContent = \`profiles-top: \${v}px;\`;
        });
        
        // initialize value from element
        if(tProfiles && tProfiles.style.top) {
            const currentVal = parseInt(tProfiles.style.top);
            if(!isNaN(currentVal)) {
                ptSlider.value = currentVal;
                ptVal.textContent = currentVal;
                resultBox.textContent = \`profiles-top: \${currentVal}px;\`;
            }
        }
    }
</script>
<!-- /TEAM TUNER UI V5 -->
</body>`;

html = html.replace('</body>', tunerHtmlV5);
fs.writeFileSync('team.html', html);
console.log('Applied final values and injected Tuner V5!');
