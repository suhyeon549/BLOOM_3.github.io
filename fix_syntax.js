const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

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
    fs.writeFileSync('product.html', html);
    console.log("Fixed syntax error");
} else {
    console.log("Could not find start or end");
}
