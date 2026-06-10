const fs = require('fs');
let html = fs.readFileSync('team.html', 'utf8');

// 1. Apply profile gap
html = html.replace(/<div id="t-profiles"([^>]*?)style="([^"]*?)gap:\s*\d+px;([^"]*?)"([^>]*?)>/, '<div id="t-profiles"$1style="$2gap: 24px;$3"$4>');

// 2. Add ID to the second tags container to target its margin-top easily
// We need to find the second occurrence of t-tags-cont and add an id if it's not there.
if (!html.includes('id="t-tags-2"')) {
    let firstContIdx = html.indexOf('class="t-tags-cont"');
    if (firstContIdx !== -1) {
        let secondContIdx = html.indexOf('class="t-tags-cont"', firstContIdx + 1);
        if (secondContIdx !== -1) {
            html = html.substring(0, secondContIdx) + 'id="t-tags-2" ' + html.substring(secondContIdx);
        }
    }
}

// 3. Remove old Tuner UI V3 (and earlier)
let tunerStart = html.indexOf('<!-- TEAM TUNER UI');
let tunerEnd = html.indexOf('<!-- /TEAM TUNER UI V3 -->');
if (tunerEnd === -1) tunerEnd = html.indexOf('<!-- /TEAM TUNER UI V2 -->');
if (tunerEnd === -1) tunerEnd = html.indexOf('<!-- /TEAM TUNER UI -->');

if (tunerStart !== -1 && tunerEnd !== -1) {
    let endTagStr = html.substring(tunerEnd, tunerEnd + 50);
    let endLen = endTagStr.indexOf('-->') + 3;
    html = html.substring(0, tunerStart) + html.substring(tunerEnd + endLen);
}

// 4. Inject new Tuner UI V4
const tunerHtmlV4 = `
<!-- TEAM TUNER UI V4 -->
<div id="team-tuner" style="position: fixed; top: 20px; right: 20px; width: 340px; background: rgba(0,0,0,0.85); color: white; padding: 20px; border-radius: 8px; z-index: 99999; font-family: sans-serif; font-size: 13px;">
    <h3 style="margin-top: 0; color: #fff; font-size: 16px;">Title & Tag Gap Tuner</h3>
    
    <label>Title Top (px): <span id="val-tt">121</span></label>
    <input type="range" id="t-tt" min="0" max="800" value="121" style="width: 100%; margin-bottom: 12px;">
    
    <label>Bottom Person Tag Margin Top (px): <span id="val-btm">24</span></label>
    <input type="range" id="t-btm" min="0" max="100" value="24" style="width: 100%; margin-bottom: 12px;">

    <div style="margin-top: 15px; padding: 10px; background: #333; word-break: break-all; user-select: all;" id="team-tuner-result">
        title-top: 121px; bottom-tag-margin: 24px;
    </div>
</div>

<script>
    const tTitle = document.getElementById('t-title');
    const tTags2 = document.getElementById('t-tags-2');
    const resultBox = document.getElementById('team-tuner-result');
    
    const ttSlider = document.getElementById('t-tt');
    const btmSlider = document.getElementById('t-btm');
    const ttVal = document.getElementById('val-tt');
    const btmVal = document.getElementById('val-btm');

    function updateResult() {
        const tt = ttSlider ? ttSlider.value : 121;
        const btm = btmSlider ? btmSlider.value : 24;
        resultBox.textContent = \`title-top: \${tt}px; bottom-tag-margin: \${btm}px;\`;
    }

    if(ttSlider) {
        ttSlider.addEventListener('input', (e) => {
            const v = e.target.value;
            ttVal.textContent = v;
            if(tTitle) tTitle.style.top = v + 'px';
            updateResult();
        });
    }

    if(btmSlider) {
        btmSlider.addEventListener('input', (e) => {
            const v = e.target.value;
            btmVal.textContent = v;
            if(tTags2) tTags2.style.marginTop = v + 'px';
            updateResult();
        });
    }
</script>
<!-- /TEAM TUNER UI V4 -->
</body>`;

html = html.replace('</body>', tunerHtmlV4);
fs.writeFileSync('team.html', html);
console.log('Applied profile gap 24px and injected Tuner V4!');
