const fs = require('fs');
let html = fs.readFileSync('team.html', 'utf8');

// 1. Add classes to photo boxes and names if not already there
html = html.replace(/<div style="width: (\d+)px; height: (\d+)px;([^"]*?)flex-shrink: 0;">/g, '<div class="t-photo-box" style="width: $1px; height: $2px;$3flex-shrink: 0;">');
html = html.replace(/<p style="([^"]*?)font-size: 14px;([^"]*?)">(YEON SUHYEON|CHU JOOHYEON)<\/p>/g, '<p class="t-photo-name" style="$1font-size: 14px;$2">$3</p>');

// 2. The V2 Tuner HTML
const tunerHtml = `
<!-- TEAM TUNER UI V2 -->
<div id="team-tuner" style="position: fixed; top: 20px; right: 20px; width: 340px; max-height: 90vh; overflow-y: auto; background: rgba(0,0,0,0.85); color: white; padding: 20px; border-radius: 8px; z-index: 99999; font-family: sans-serif; font-size: 13px; scrollbar-width: thin;">
    <h3 style="margin-top: 0; color: #fff; font-size: 16px;">Team Layout Tuner V2</h3>
    
    <label>Title Left (px): <span id="val-tl">140</span></label>
    <input type="range" id="t-tl" min="0" max="800" value="140" style="width: 100%; margin-bottom: 10px;">
    
    <label>Title Top (px): <span id="val-tt">180</span></label>
    <input type="range" id="t-tt" min="0" max="800" value="180" style="width: 100%; margin-bottom: 10px;">

    <label>Profiles Left (px): <span id="val-pl">1000</span></label>
    <input type="range" id="t-pl" min="400" max="1500" value="1000" style="width: 100%; margin-bottom: 10px;">
    
    <label>Profiles Top (px): <span id="val-pt">320</span></label>
    <input type="range" id="t-pt" min="0" max="800" value="320" style="width: 100%; margin-bottom: 10px;">

    <!-- NEW CONTROLS -->
    <label>Photo Width (px): <span id="val-pw">280</span></label>
    <input type="range" id="t-pw" min="100" max="500" value="280" style="width: 100%; margin-bottom: 10px;">
    
    <label>Photo Height (px): <span id="val-ph">186</span></label>
    <input type="range" id="t-ph" min="100" max="500" value="186" style="width: 100%; margin-bottom: 10px;">
    
    <label>Photo Name Size (px): <span id="val-pns">14</span></label>
    <input type="range" id="t-pns" min="10" max="40" value="14" style="width: 100%; margin-bottom: 10px;">
    <!-- END NEW CONTROLS -->

    <label>Role Font Size (px): <span id="val-rs">24</span></label>
    <input type="range" id="t-rs" min="10" max="50" value="24" style="width: 100%; margin-bottom: 10px;">

    <label>Desc Font Size (px): <span id="val-ds">14</span></label>
    <input type="range" id="t-ds" min="10" max="30" value="14" style="width: 100%; margin-bottom: 10px;">

    <label>Tag Gap (px): <span id="val-tg">10</span></label>
    <input type="range" id="t-tg" min="0" max="40" value="10" style="width: 100%; margin-bottom: 10px;">

    <label>Tag Font Size (px): <span id="val-tfs">11</span></label>
    <input type="range" id="t-tfs" min="8" max="24" value="11" style="width: 100%; margin-bottom: 10px;">

    <label>Tag Pad Y (px): <span id="val-tpy">4</span></label>
    <input type="range" id="t-tpy" min="0" max="20" value="4" style="width: 100%; margin-bottom: 10px;">

    <label>Tag Pad X (px): <span id="val-tpx">12</span></label>
    <input type="range" id="t-tpx" min="0" max="40" value="12" style="width: 100%; margin-bottom: 10px;">

    <div style="margin-top: 15px; padding: 10px; background: #333; word-break: break-all; user-select: all;" id="team-tuner-result">
        title-pos: 140px 180px; profiles-pos: 1000px 320px; photo: 280px 186px; name-size: 14px; role-size: 24px; desc-size: 14px; tag-gap: 10px; tag-size: 11px; tag-pad: 4px 12px;
    </div>
</div>

<script>
    const tTitle = document.getElementById('t-title');
    const tProfiles = document.getElementById('t-profiles');
    
    // NEW Elements
    const photoBoxes = document.querySelectorAll('.t-photo-box');
    const photoNames = document.querySelectorAll('.t-photo-name');
    
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
    
    bind('t-pw', 'val-pw', v => photoBoxes.forEach(el => el.style.width = v + 'px'));
    bind('t-ph', 'val-ph', v => photoBoxes.forEach(el => el.style.height = v + 'px'));
    bind('t-pns', 'val-pns', v => photoNames.forEach(el => el.style.fontSize = v + 'px'));

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
        
        const pw = document.getElementById('t-pw').value;
        const ph = document.getElementById('t-ph').value;
        const pns = document.getElementById('t-pns').value;

        const rs = document.getElementById('t-rs').value;
        const ds = document.getElementById('t-ds').value;
        const tg = document.getElementById('t-tg').value;
        const tfs = document.getElementById('t-tfs').value;
        const tpy = document.getElementById('t-tpy').value;
        const tpx = document.getElementById('t-tpx').value;
        
        resultBox.textContent = \`title-pos: \${tl}px \${tt}px; profiles-pos: \${pl}px \${pt}px; photo: \${pw}px \${ph}px; name-size: \${pns}px; role-size: \${rs}px; desc-size: \${ds}px; tag-gap: \${tg}px; tag-size: \${tfs}px; tag-pad: \${tpy}px \${tpx}px;\`;
    }
</script>
<!-- /TEAM TUNER UI V2 -->
</body>`;

// Remove old tuner if exists
let tunerStart = html.indexOf('<!-- TEAM TUNER UI -->');
let tunerEnd = html.indexOf('<!-- /TEAM TUNER UI -->');
if (tunerStart !== -1 && tunerEnd !== -1) {
    html = html.substring(0, tunerStart) + html.substring(tunerEnd + '<!-- /TEAM TUNER UI -->'.length);
}

// Remove old tuner V2 if exists
let tunerStart2 = html.indexOf('<!-- TEAM TUNER UI V2 -->');
let tunerEnd2 = html.indexOf('<!-- /TEAM TUNER UI V2 -->');
if (tunerStart2 !== -1 && tunerEnd2 !== -1) {
    html = html.substring(0, tunerStart2) + html.substring(tunerEnd2 + '<!-- /TEAM TUNER UI V2 -->'.length);
}

html = html.replace('</body>', tunerHtml);
fs.writeFileSync('team.html', html);
console.log('Team tuner V2 injected!');
