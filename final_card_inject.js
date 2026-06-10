const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// 1. Give the video an ID and transition
const videoSrcTarget = '<video src="assets/package-video.mp4" autoplay loop muted playsinline style="';
if (html.includes(videoSrcTarget)) {
    html = html.replace(videoSrcTarget, '<video id="section-3-video" src="assets/step-1-video.mp4" autoplay loop muted playsinline style="transition: opacity 0.5s ease; ');
}

// 2. Replace step-01, 02, 03
// The typo in original is "A Soap Stroy"
const step01Start = html.indexOf('<div class="prod-fade-up step-01"');
const step03EndSearchStr = 'A Soap Stroy';
let step03Match = html.indexOf(step03EndSearchStr);

if (step01Start !== -1 && step03Match !== -1) {
    let step03End = html.indexOf('</div>', step03Match); // end of p
    step03End = html.indexOf('</div>', step03End + 1); // end of div wrapping p
    step03End = html.indexOf('</div>', step03End + 1); // end of step-03 inner
    step03End = html.indexOf('</div>', step03End + 1); // end of step-03 outer
    step03End += 6; // include </div>

    // Double check we are not cutting too much
    // Actually we can just find the closing tag of <div class="how-it-works-wrapper"
    // Wait, the how-it-works-wrapper contains step-01, step-02, step-03
    // Let's replace the whole innerHTML of how-it-works-wrapper

    const wrapperStart = html.indexOf('<div class="how-it-works-wrapper"');
    const wrapperInnerStart = html.indexOf('>', wrapperStart) + 1;
    const step03MatchInWrapper = html.indexOf('A Soap Stroy', wrapperInnerStart);
    let wrapperInnerEnd = html.indexOf('</div>\n            </div>', step03MatchInWrapper);
    
    // We can just replace from step01Start to the end of step-03 outer
    // Let's use precise indices
    let endOfStep03 = html.indexOf('</div>', step03MatchInWrapper); // p wrapper
    endOfStep03 = html.indexOf('</div>', endOfStep03 + 1); // text container
    endOfStep03 = html.indexOf('</div>', endOfStep03 + 1); // step-03 wrapper
    endOfStep03 += 6;

    const replacementDOM = `
              <div class="prod-fade-up step-01" id="curation-card" style="
                  position: absolute;
                  left: 40px;
                  bottom: 40px;
                  top: auto;
                  width: 580px;
                  height: 260px;
                  background-color: #F8F8F8;
                  z-index: 10;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  box-sizing: border-box;
                ">
                <!-- 4 corner dots -->
                <div style="position: absolute; top: 16px; left: 16px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                <div style="position: absolute; top: 16px; right: 16px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                <div style="position: absolute; bottom: 16px; left: 16px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                <div style="position: absolute; bottom: 16px; right: 16px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                
                <div style="color: #1e1e1e; z-index: 2; padding: 0 40px; width: 100%;">
                  <p id="curation-title" style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      font-weight: 700;
                      font-size: 28px;
                      letter-spacing: -1px;
                      margin: 0;
                      transition: opacity 0.5s ease;
                    ">
                    Step 01. Answer Your Mood
                  </p>
                  <p id="curation-desc" style="
                      font-family: 'Pretendard', sans-serif;
                      font-weight: 400;
                      font-size: 16px;
                      letter-spacing: -0.5px;
                      line-height: 1.5;
                      margin-top: 16px;
                      margin-bottom: 0;
                      transition: opacity 0.5s ease;
                      word-break: keep-all;
                    ">
                    사용하고 싶은 기분, 날씨, 계절, 분위기를 선택합니다.
                  </p>
                </div>
              </div>`;

    html = html.substring(0, step01Start) + replacementDOM + html.substring(endOfStep03);
    console.log('Replaced DOM');
} else {
    console.log('Could not find step-01 or A Soap Stroy', step01Start, step03Match);
}

// Ensure updateSection3SubStep is correct and works for the new DOM
const newVars = `
    let currentSubStep2 = 0;

    function updateSection3SubStep(step) {
      const title = document.getElementById('curation-title');
      const desc = document.getElementById('curation-desc');
      const video = document.getElementById('section-3-video');
      
      if (!title || !desc || !video) return;

      // Fade out
      title.style.opacity = '0';
      desc.style.opacity = '0';
      video.style.opacity = '0';

      setTimeout(() => {
        if (step === 0) {
          title.textContent = 'Step 01. Answer Your Mood';
          desc.innerHTML = '사용하고 싶은 기분, 날씨, 계절, 분위기를 선택합니다.';
          video.src = 'assets/step-1-video.mp4';
        } else if (step === 1) {
          title.textContent = 'Step 02. Soap Mood Cards';
          desc.innerHTML = '선택한 기준에 맞춰 어울리는 비누 카드가 제안됩니다.';
          video.src = 'assets/step-2-video.mp4';
        } else if (step === 2) {
          title.textContent = 'Step 03. A Soap Story';
          desc.innerHTML = '마음에 드는 비누를 클릭하면 사용 상황과 짧은 스토리를 확인할 수 있습니다.';
          video.src = 'assets/step3-video.mp4';
        }
        
        // Fade in
        title.style.opacity = '1';
        desc.style.opacity = '1';
        video.style.opacity = '1';
      }, 500);
    }
`;

if (!html.includes('function updateSection3SubStep')) {
    html = html.replace('let activeSectionIndex = 0;', 'let activeSectionIndex = 0;' + newVars);
} else {
    // Replace old updateSection3SubStep if it exists
    const updateStart = html.indexOf('function updateSection3SubStep(step) {');
    const updateEnd = html.indexOf('}', html.indexOf('video.style.opacity =', updateStart)) + 1;
    if (updateStart !== -1) {
        // Just leave it, the logic is the same
    }
}

fs.writeFileSync('product.html', html);
console.log('Done!');
