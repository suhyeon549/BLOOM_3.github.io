const fs = require('fs');
let html = fs.readFileSync('team.html', 'utf8');

// 1. Add IDs and classes to easily target elements if not already there
html = html.replace(/<p class="fade-up" style="([^"]*?)left: 140px([^"]*?)">(\s*)BLOOM MAKERS./g, '<p id="t-title" class="fade-up" style="$1left: 140px$2">$3BLOOM MAKERS.');
html = html.replace(/<div style="([^"]*?)left: 1000px; top: 320px([^"]*?)">/g, '<div id="t-profiles" style="$1left: 1000px; top: 320px$2">');
html = html.replace(/<p style="([^"]*?)font-size: 24px;([^"]*?)">BRAND PLANNER/g, '<p class="t-role" style="$1font-size: 24px;$2">BRAND PLANNER');
html = html.replace(/<p style="([^"]*?)font-size: 24px;([^"]*?)">VISUAL DESIGNER/g, '<p class="t-role" style="$1font-size: 24px;$2">VISUAL DESIGNER');
html = html.replace(/<p style="([^"]*?)font-size: 14px;([^"]*?)">\s*BLOOM의 브랜드 방향/g, '<p class="t-desc" style="$1font-size: 14px;$2">\n                    BLOOM의 브랜드 방향');
html = html.replace(/<p style="([^"]*?)font-size: 14px;([^"]*?)">\s*BLOOM의 브랜드 이미지/g, '<p class="t-desc" style="$1font-size: 14px;$2">\n                    BLOOM의 브랜드 이미지');
html = html.replace(/<div style="([^"]*?)gap: 10px; margin-top: 24px([^"]*?)">/g, '<div class="t-tags-cont" style="$1gap: 10px; margin-top: 24px$2">');
html = html.replace(/<span style="([^"]*?)border: 1px solid/g, '<span class="t-tag" style="$1border: 1px solid');

// 2. The Tuner HTML
const tunerHtml = `
<!-- TEAM TUNER UI -->
<div id="team-tuner" style="position: fixed; top: 20px; right: 20px; width: 340px; max-height: 90vh; overflow-y: auto; background: rgba(0,0,0,0.85); color: white; padding: 20px; border-radius: 8px; z-index: 99999; font-family: sans-serif; font-size: 13px;">
    <h3 style="margin-top: 0; color: #fff; font-size: 16px;">Team Layout Tuner</h3>
    
    <label>Title Left (px): <span id="val-tl">140</span></label>
    <input type="range" id="t-tl" min="0" max="800" value="140" style="width: 100%; margin-bottom: 12px;">
    
    <label>Title Top (px): <span id="val-tt">180</span></label>
    <input type="range" id="t-tt" min="0" max="800" value="180" style="width: 100%; margin-bottom: 12px;">

    <label>Profiles Left (px): <span id="val-pl">1000</span></label>
    <input type="range" id="t-pl" min="400" max="1500" value="1000" style="width: 100%; margin-bottom: 12px;">
    
    <label>Profiles Top (px): <span id="val-pt">320</span></label>
    <input type="range" id="t-pt" min="0" max="800" value="320" style="width: 100%; margin-bottom: 12px;">

    <label>Role Font Size (px): <span id="val-rs">24</span></label>
    <input type="range" id="t-rs" min="10" max="50" value="24" style="width: 100%; margin-bottom: 12px;">

    <label>Desc Font Size (px): <span id="val-ds">14</span></label>
    <input type="range" id="t-ds" min="10" max="30" value="14" style="width: 100%; margin-bottom: 12px;">

    <label>Tag Gap (px): <span id="val-tg">10</span></label>
    <input type="range" id="t-tg" min="0" max="40" value="10" style="width: 100%; margin-bottom: 12px;">

    <label>Tag Font Size (px): <span id="val-tfs">11</span></label>
    <input type="range" id="t-tfs" min="8" max="24" value="11" style="width: 100%; margin-bottom: 12px;">

    <label>Tag Pad Y (px): <span id="val-tpy">4</span></label>
    <input type="range" id="t-tpy" min="0" max="20" value="4" style="width: 100%; margin-bottom: 12px;">

    <label>Tag Pad X (px): <span id="val-tpx">12</span></label>
    <input type="range" id="t-tpx" min="0" max="40" value="12" style="width: 100%; margin-bottom: 12px;">

    <div style="margin-top: 15px; padding: 10px; background: #333; word-break: break-all; user-select: all;" id="team-tuner-result">
        title-pos: 140px 180px; profiles-pos: 1000px 320px; role-size: 24px; desc-size: 14px; tag-gap: 10px; tag-size: 11px; tag-pad: 4px 12px;
    </div>
</div>

<script>
    const tTitle = document.getElementById('t-title');
    const tProfiles = document.getElementById('t-profiles');
    const roles = document.querySelectorAll('.t-role');
    const descs = document.querySelectorAll('.t-desc');
    const tagConts = document.querySelectorAll('.t-tags-cont');
    const tags = document.querySelectorAll('.t-tag');
    
    const resultBox = document.getElementById('team-tuner-result');

    function bind(id, displayId, handler) {
        const slider = document.getElementById(id);
        const disp = document.getElementById(displayId);
        if(!slider) return;
        slider.addEventListener('input', (e) => {
            disp.textContent = e.target.value;
            handler(e.target.value);
            updateResult();
        });
    }

    bind('t-tl', 'val-tl', v => { if(tTitle) tTitle.style.left = v + 'px'; });
    bind('t-tt', 'val-tt', v => { if(tTitle) tTitle.style.top = v + 'px'; });
    bind('t-pl', 'val-pl', v => { if(tProfiles) tProfiles.style.left = v + 'px'; });
    bind('t-pt', 'val-pt', v => { if(tProfiles) tProfiles.style.top = v + 'px'; });
    bind('t-rs', 'val-rs', v => roles.forEach(el => el.style.fontSize = v + 'px'));
    bind('t-ds', 'val-ds', v => descs.forEach(el => el.style.fontSize = v + 'px'));
    bind('t-tg', 'val-tg', v => tagConts.forEach(el => el.style.gap = v + 'px'));
    bind('t-tfs', 'val-tfs', v => tags.forEach(el => el.style.fontSize = v + 'px'));
    
    const updatePadding = () => {
        const py = document.getElementById('t-tpy').value;
        const px = document.getElementById('t-tpx').value;
        tags.forEach(el => el.style.padding = \`\${py}px \${px}px\`);
    };
    bind('t-tpy', 'val-tpy', updatePadding);
    bind('t-tpx', 'val-tpx', updatePadding);

    function updateResult() {
        const tl = document.getElementById('t-tl').value;
        const tt = document.getElementById('t-tt').value;
        const pl = document.getElementById('t-pl').value;
        const pt = document.getElementById('t-pt').value;
        const rs = document.getElementById('t-rs').value;
        const ds = document.getElementById('t-ds').value;
        const tg = document.getElementById('t-tg').value;
        const tfs = document.getElementById('t-tfs').value;
        const tpy = document.getElementById('t-tpy').value;
        const tpx = document.getElementById('t-tpx').value;
        
        resultBox.textContent = \`title-pos: \${tl}px \${tt}px; profiles-pos: \${pl}px \${pt}px; role-size: \${rs}px; desc-size: \${ds}px; tag-gap: \${tg}px; tag-size: \${tfs}px; tag-pad: \${tpy}px \${tpx}px;\`;
    }
</script>
<!-- /TEAM TUNER UI -->
</body>`;

// Remove old tuner if exists
let tunerStart = html.indexOf('<!-- TEAM TUNER UI -->');
let tunerEnd = html.indexOf('<!-- /TEAM TUNER UI -->');
if (tunerStart !== -1 && tunerEnd !== -1) {
    html = html.substring(0, tunerStart) + html.substring(tunerEnd + '<!-- /TEAM TUNER UI -->'.length);
}

html = html.replace('</body>', tunerHtml);
fs.writeFileSync('team.html', html);
console.log('Team tuner injected!');
