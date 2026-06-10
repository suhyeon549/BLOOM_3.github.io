const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// 1. Give the video an ID and transition
const videoSrcTarget = '<video src="assets/package-video.mp4" autoplay loop muted playsinline style="';
if (html.includes(videoSrcTarget)) {
    html = html.replace(videoSrcTarget, '<video id="section-3-video" src="assets/step-1-video.mp4" autoplay loop muted playsinline style="transition: opacity 0.5s ease; ');
}

// 2. Modify step-01 styling and add IDs for text
const step01Start = html.indexOf('<div class="prod-fade-up step-01"');
const step01End = html.indexOf('<div class="prod-fade-up step-02"');

if (step01Start !== -1 && step01End !== -1) {
    let step01Block = html.substring(step01Start, step01End);

    // change position from top: 168px to bottom: 40px
    step01Block = step01Block.replace('top: 168px;', 'bottom: 40px; top: auto;');
    step01Block = step01Block.replace('top: 168px;', 'bottom: 40px; top: auto;');
    
    // add ID to card
    step01Block = step01Block.replace('<div class="prod-fade-up step-01"', '<div class="prod-fade-up step-01" id="curation-card"');

    // add ID to title
    step01Block = step01Block.replace('<span class="" style="line-height: 1.1">Step 0</span>', '<span id="curation-title" style="line-height: 1.1; transition: opacity 0.5s ease; display: inline-block;">Step 01. Answer Your Mood</span><!--');
    step01Block = step01Block.replace('Answer Your Mood</span>', '-->');

    // add ID to description and span
    step01Block = step01Block.replace('<p style="margin: 0; line-height: 1.4">', '<p id="curation-desc" style="margin: 0; line-height: 1.4; transition: opacity 0.5s ease;">');
    
    // Delete step-02 and step-03
    const step03EndSearchStr = 'A Soap Story';
    let step03Match = html.indexOf(step03EndSearchStr);
    let step03End = html.indexOf('</div>', step03Match); // end of p
    step03End = html.indexOf('</div>', step03End + 1); // end of div wrapping p
    step03End = html.indexOf('</div>', step03End + 1); // end of step-03
    step03End = html.indexOf('</div>', step03End + 1); // end of step-03 wrapper
    step03End += 6; // include </div>

    html = html.substring(0, step01Start) + step01Block + html.substring(step03End);
}

// 3. Update handleGlobalScroll logic
const startStr = "    function handleGlobalScroll(deltaY) {";
const endStr = "    window.addEventListener('wheel'";
const startIdx = html.indexOf(startStr);
const endIdx = html.indexOf(endStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `    function handleGlobalScroll(deltaY) {
      if (isGlobalTransitioning) return;
      const currentSection = globalSections[activeSectionIndex];
      if (!currentSection) return;

      if ((deltaY > 0 && globalScrollAccumulator < 0) || (deltaY < 0 && globalScrollAccumulator > 0)) {
        globalScrollAccumulator = 0;
      }

      globalScrollAccumulator += deltaY;

      if (globalScrollAccumulator > 0) { // Scroll down
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

        let threshold = 800;

        if (globalScrollAccumulator > threshold) {
          if (activeSectionIndex < globalSections.length - 1) {
            isGlobalTransitioning = true;
            activeSectionIndex++;
            updateHeaderTheme();
            if (activeSectionIndex === 1) section1EnterDirection = 'down';

            const scale = window.innerWidth / 1920;
            const targetY = globalSections[activeSectionIndex].offsetTop * scale;

            customSmoothScrollTo(targetY, 1200);
            saveScrollState();
            triggerSectionAnimations(activeSectionIndex);

            setTimeout(() => {
              isGlobalTransitioning = false;
              globalScrollAccumulator = 0;
            }, 1300);
          } else {
            globalScrollAccumulator = threshold;
          }
        }
      } else if (globalScrollAccumulator < 0) { // Scroll up
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

        let threshold = -800;

        if (globalScrollAccumulator < threshold) {
          if (activeSectionIndex > 0) {
            isGlobalTransitioning = true;
            activeSectionIndex--;
            if (activeSectionIndex === 2) {
                currentSubStep2 = 2; // enter from bottom
                updateSection3SubStep(currentSubStep2); // immediately update visual state
            }
            updateHeaderTheme();
            if (activeSectionIndex === 1) section1EnterDirection = 'up';

            const scale = window.innerWidth / 1920;
            const targetY = globalSections[activeSectionIndex].offsetTop * scale;

            customSmoothScrollTo(targetY, 1200);
            saveScrollState();
            triggerSectionAnimations(activeSectionIndex);

            setTimeout(() => {
              isGlobalTransitioning = false;
              globalScrollAccumulator = 0;
            }, 1300);
          } else {
            globalScrollAccumulator = threshold;
          }
        }
      }
    }

`;
    html = html.substring(0, startIdx) + replacement + html.substring(endIdx);
}

// 4. Update triggerSectionAnimations
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

if (!html.includes('let currentSubStep2 = 0;')) {
    html = html.replace('let activeSectionIndex = 0;', 'let activeSectionIndex = 0;' + newVars);
}

fs.writeFileSync('product.html', html);
console.log('Successfully updated product.html with bottom-left layout!');
