const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// 1. Modify the DOM.
// Find the block containing step-01, step-02, step-03
const step01Start = html.indexOf('<div class="prod-fade-up step-01"');
const step03EndSearchStr = 'A Soap Story';
const step03Match = html.indexOf(step03EndSearchStr);

if (step01Start !== -1 && step03Match !== -1) {
    let step03End = html.indexOf('</div>', step03Match); // end of p
    step03End = html.indexOf('</div>', step03End + 1); // end of div wrapping p
    step03End = html.indexOf('</div>', step03End + 1); // end of step-03
    step03End = html.indexOf('</div>', step03End + 1); // end of step-03 wrapper
    step03End += 6; // include </div>

    // We will replace the entire step-01, 02, 03 block with a single dynamic card.
    const replacementDOM = `
              <div class="prod-fade-up step-01" id="curation-card" style="
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  width: 600px;
                  height: 412px;
                  z-index: 10;
                  transition: opacity 0.5s ease;
                ">
                <img alt="" src="assets/5d8ca2459e7b151d6334751bae70430184af934e.svg" style="
                    position: absolute;
                    display: block;
                    width: 100%;
                    height: 100%;
                  " />
                <div style="
                    position: absolute;
                    width: 100%;
                    text-align: center;
                    top: 120px;
                    color: #1e1e1e;
                  ">
                  <p id="curation-title" style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      font-weight: 600;
                      font-size: 36px;
                      letter-spacing: -2px;
                      line-height: 1.1;
                      transition: opacity 0.5s ease;
                    ">
                    Step 01. Answer Your Mood
                  </p>
                  <p id="curation-desc" style="
                      font-family: 'Pretendard', sans-serif;
                      font-size: 20px;
                      letter-spacing: -0.6px;
                      line-height: 1.4;
                      margin-top: 24px;
                      transition: opacity 0.5s ease;
                    ">
                    사용하고 싶은 기분, 날씨, 계절, 분위기를 선택합니다.
                  </p>
                </div>
              </div>`;

    html = html.substring(0, step01Start) + replacementDOM + html.substring(step03End);
}

// 2. Add an ID to the video in section 3 so we can change its src
// The video is before step-01.
const videoSrcTarget = '<video src="assets/package-video.mp4" autoplay loop muted playsinline style="';
html = html.replace(videoSrcTarget, '<video id="section-3-video" src="assets/step-1-video.mp4" autoplay loop muted playsinline style="transition: opacity 0.5s ease; ');

// 3. Update handleGlobalScroll logic
const scrollLogicStart = html.indexOf('if (globalScrollAccumulator > 0) { // Scroll down');
const scrollLogicEnd = html.indexOf('} else if (globalScrollAccumulator < 0) { // Scroll up');

const newScrollLogicDown = `      if (globalScrollAccumulator > 0) { // Scroll down
        if (activeSectionIndex === 2) {
          if (currentSubStep2 === 0 && globalScrollAccumulator > 300) {
            currentSubStep2 = 1;
            updateSection3SubStep(currentSubStep2);
            globalScrollAccumulator = 0;
            return;
          } else if (currentSubStep2 === 1 && globalScrollAccumulator > 300) {
            currentSubStep2 = 2;
            updateSection3SubStep(currentSubStep2);
            globalScrollAccumulator = 0;
            return;
          } else if (currentSubStep2 < 2) {
            return; // block transition
          }
        }
`;

const scrollLogicUpStart = html.indexOf('} else if (globalScrollAccumulator < 0) { // Scroll up');
const scrollLogicUpEnd = html.indexOf('let threshold = -800;', scrollLogicUpStart);

const newScrollLogicUp = `} else if (globalScrollAccumulator < 0) { // Scroll up
        if (activeSectionIndex === 2) {
          if (currentSubStep2 > 0 && globalScrollAccumulator < -300) {
            currentSubStep2--;
            updateSection3SubStep(currentSubStep2);
            globalScrollAccumulator = 0;
            return;
          } else if (currentSubStep2 > 0) {
            return; // block transition
          }
        }
        `;

html = html.replace(html.substring(scrollLogicStart, scrollLogicStart + 51), newScrollLogicDown);
html = html.replace(html.substring(scrollLogicUpStart, scrollLogicUpEnd), newScrollLogicUp);


// 4. Update triggerSectionAnimations for index === 2
const trigStart = html.indexOf('} else if (index === 2) {');
const trigEnd = html.indexOf('} else if (index === 3) {');

const newTrig = `      } else if (index === 2) {
        currentSubStep2 = 0; // reset sub step
        updateSection3SubStep(0);
        
        const card = document.getElementById('curation-card');
        if (card) {
          card.classList.remove('visible');
          void card.offsetWidth;
          setTimeout(() => card.classList.add('visible'), 500);
        }
`;

html = html.substring(0, trigStart) + newTrig + html.substring(trigEnd);

// 5. Add currentSubStep2 variable and updateSection3SubStep function
const scriptStart = html.indexOf('let activeSectionIndex = 0;');
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

html = html.replace('let activeSectionIndex = 0;', 'let activeSectionIndex = 0;' + newVars);

// Fix: when moving UP from section 3 to section 2, we need to enter from bottom (step 2)
// This is inside handleGlobalScroll, scroll up block.
html = html.replace(
  `activeSectionIndex--;`,
  `activeSectionIndex--;
            if (activeSectionIndex === 2) {
                currentSubStep2 = 2; // enter from bottom
            }`
);


fs.writeFileSync('product.html', html);
console.log('Successfully updated product.html');
