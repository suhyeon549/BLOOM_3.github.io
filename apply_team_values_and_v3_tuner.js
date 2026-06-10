const fs = require('fs');
let html = fs.readFileSync('team.html', 'utf8');

// 1. Apply final values to team.html elements
html = html.replace(/<p id="t-title"([^>]*?)style="([^"]*?)left:\s*\d+px;([^"]*?)"([^>]*?)>/, '<p id="t-title"$1style="$2left: 50px;$3"$4>');
html = html.replace(/<p id="t-title"([^>]*?)style="([^"]*?)top:\s*\d+px;([^"]*?)"([^>]*?)>/, '<p id="t-title"$1style="$2top: 121px;$3"$4>');

html = html.replace(/<div id="t-profiles"([^>]*?)style="([^"]*?)left:\s*\d+px;([^"]*?)"([^>]*?)>/, '<div id="t-profiles"$1style="$2left: 1109px;$3"$4>');
html = html.replace(/<div id="t-profiles"([^>]*?)style="([^"]*?)top:\s*\d+px;([^"]*?)"([^>]*?)>/, '<div id="t-profiles"$1style="$2top: 320px;$3"$4>');

html = html.replace(/<div class="t-photo-box"([^>]*?)style="([^"]*?)width:\s*\d+px;([^"]*?)"([^>]*?)>/g, '<div class="t-photo-box"$1style="$2width: 355px;$3"$4>');
html = html.replace(/<div class="t-photo-box"([^>]*?)style="([^"]*?)height:\s*\d+px;([^"]*?)"([^>]*?)>/g, '<div class="t-photo-box"$1style="$2height: 274px;$3"$4>');

html = html.replace(/<p class="t-photo-name"([^>]*?)style="([^"]*?)font-size:\s*\d+px;([^"]*?)"([^>]*?)>/g, '<p class="t-photo-name"$1style="$2font-size: 19px;$3"$4>');

html = html.replace(/<p class="t-role"([^>]*?)style="([^"]*?)font-size:\s*\d+px;([^"]*?)"([^>]*?)>/g, '<p class="t-role"$1style="$2font-size: 24px;$3"$4>');

html = html.replace(/<p class="t-desc"([^>]*?)style="([^"]*?)font-size:\s*\d+px;([^"]*?)"([^>]*?)>/g, '<p class="t-desc"$1style="$2font-size: 14px;$3"$4>');

html = html.replace(/<div class="t-tags-cont"([^>]*?)style="([^"]*?)gap:\s*\d+px;([^"]*?)"([^>]*?)>/g, '<div class="t-tags-cont"$1style="$2gap: 10px;$3"$4>');

html = html.replace(/<span class="t-tag"([^>]*?)style="([^"]*?)font-size:\s*\d+px;([^"]*?)"([^>]*?)>/g, '<span class="t-tag"$1style="$2font-size: 14px;$3"$4>');

html = html.replace(/<span class="t-tag"([^>]*?)style="([^"]*?)padding:\s*\d+px\s*\d+px;([^"]*?)"([^>]*?)>/g, '<span class="t-tag"$1style="$2padding: 4px 12px;$3"$4>');

// 2. Remove old Tuner UI V2 (and V1 if exists)
let tunerStart = html.indexOf('<!-- TEAM TUNER UI');
let tunerEnd = html.indexOf('<!-- /TEAM TUNER UI V2 -->');
if (tunerEnd === -1) tunerEnd = html.indexOf('<!-- /TEAM TUNER UI -->');

if (tunerStart !== -1 && tunerEnd !== -1) {
    html = html.substring(0, tunerStart) + html.substring(tunerEnd + '<!-- /TEAM TUNER UI V2 -->'.length);
}

// 3. Inject new Tuner UI V3
const tunerHtmlV3 = `
<!-- TEAM TUNER UI V3 -->
<div id="team-tuner" style="position: fixed; top: 20px; right: 20px; width: 340px; background: rgba(0,0,0,0.85); color: white; padding: 20px; border-radius: 8px; z-index: 99999; font-family: sans-serif; font-size: 13px;">
    <h3 style="margin-top: 0; color: #fff; font-size: 16px;">Profile Gap Tuner</h3>
    
    <label>Profile Gap (px): <span id="val-pg">80</span></label>
    <input type="range" id="t-pg" min="0" max="300" value="80" style="width: 100%; margin-bottom: 10px;">
    
    <div style="margin-top: 15px; padding: 10px; background: #333; word-break: break-all; user-select: all;" id="team-tuner-result">
        profile-gap: 80px;
    </div>
</div>

<script>
    const tProfiles = document.getElementById('t-profiles');
    const resultBox = document.getElementById('team-tuner-result');
    const pgSlider = document.getElementById('t-pg');
    const pgVal = document.getElementById('val-pg');

    if(pgSlider) {
        pgSlider.addEventListener('input', (e) => {
            const v = e.target.value;
            pgVal.textContent = v;
            if(tProfiles) tProfiles.style.gap = v + 'px';
            resultBox.textContent = \`profile-gap: \${v}px;\`;
        });
    }
</script>
<!-- /TEAM TUNER UI V3 -->
</body>`;

html = html.replace('</body>', tunerHtmlV3);
fs.writeFileSync('team.html', html);
console.log('Final values applied and Team tuner V3 injected!');
