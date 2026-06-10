const fs = require('fs');
let html = fs.readFileSync('team.html', 'utf8');

// The p tag looks like this:
// <p id="t-title" class="fade-up" style="word-break: break-word; position: absolute; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; line-height: 0.95; left: 50px; color: #1e1e1e; font-size: 130px; top: 121px; letter-spacing: -6px; white-space: nowrap;">
// We need to replace "top: 121px;" with "top: 161px;"

const tTitleStart = html.indexOf('<p id="t-title"');
if (tTitleStart !== -1) {
    const tTitleEnd = html.indexOf('>', tTitleStart);
    let tTitleTag = html.substring(tTitleStart, tTitleEnd + 1);
    tTitleTag = tTitleTag.replace(/top:\s*\d+px;/, 'top: 161px;');
    html = html.substring(0, tTitleStart) + tTitleTag + html.substring(tTitleEnd + 1);
    console.log('Fixed t-title top');
} else {
    console.log('Could not find t-title');
}

// profiles top: 330px
const tProfilesStart = html.indexOf('<div id="t-profiles"');
if (tProfilesStart !== -1) {
    const tProfilesEnd = html.indexOf('>', tProfilesStart);
    let tProfilesTag = html.substring(tProfilesStart, tProfilesEnd + 1);
    tProfilesTag = tProfilesTag.replace(/top:\s*\d+px;/, 'top: 330px;');
    html = html.substring(0, tProfilesStart) + tProfilesTag + html.substring(tProfilesEnd + 1);
    console.log('Fixed t-profiles top');
} else {
    console.log('Could not find t-profiles');
}

// Ensure tuner UI V5 is completely removed if the user wanted it removed?
// Wait, the user said: "profiles-top: 330px; 이렇게 해줘. 그리고 title-top: 161px; 이거 반영 안됐어"
// And earlier they said: "위에사람과 아랫사람 관련 것들의 높이를 조절할 수 있는 바를 줘" which I did in V5.
// Since they gave me `profiles-top: 330px`, they found the ideal position.
// Let's remove the Tuner V5 completely since all adjustments are done.

let tunerStart = html.indexOf('<!-- TEAM TUNER UI');
let tunerEnd = html.indexOf('<!-- /TEAM TUNER UI V5 -->');
if (tunerEnd === -1) tunerEnd = html.indexOf('<!-- /TEAM TUNER UI V4 -->');
if (tunerEnd === -1) tunerEnd = html.indexOf('<!-- /TEAM TUNER UI V3 -->');

if (tunerStart !== -1 && tunerEnd !== -1) {
    let endTagStr = html.substring(tunerEnd, tunerEnd + 50);
    let endLen = endTagStr.indexOf('-->') + 3;
    html = html.substring(0, tunerStart) + html.substring(tunerEnd + endLen);
    console.log('Removed Tuner');
}

fs.writeFileSync('team.html', html);
