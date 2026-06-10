const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// 1. Update advanceTypewriter to trigger images sequence and smooth speed
const oldAdvance = `    function advanceTypewriter() {
      const container = document.getElementById('typewriter-text-container');
      const paragraphs = container.querySelectorAll('.tw-p');

      if (currentP >= typewriterTextData.length) {
        isTypewriterFinished = true;
        return;
      }

      let targetText = typewriterTextData[currentP];
      currentChar += 5; // advance 5 chars
      if (currentChar > targetText.length) currentChar = targetText.length;

      if (paragraphs[currentP]) {
        paragraphs[currentP].textContent = targetText.substring(0, currentChar);
      }

      if (currentChar >= targetText.length) {
        currentP++;
        currentChar = 0;
        if (currentP >= typewriterTextData.length) {
          isTypewriterFinished = true;
        }
      }
    }`;

const newAdvance = `    function advanceTypewriter() {
      const container = document.getElementById('typewriter-text-container');
      const paragraphs = container.querySelectorAll('.tw-p');

      if (currentP >= typewriterTextData.length) {
        isTypewriterFinished = true;
        return;
      }

      let targetText = typewriterTextData[currentP];
      currentChar += 2; // advance 2 chars
      if (currentChar > targetText.length) currentChar = targetText.length;

      if (paragraphs[currentP]) {
        paragraphs[currentP].textContent = targetText.substring(0, currentChar);
      }

      if (currentChar >= targetText.length) {
        currentP++;
        currentChar = 0;
        if (currentP >= typewriterTextData.length) {
          isTypewriterFinished = true;
          
          const photo1 = document.querySelector('[data-node-id="71:929"]');
          const text1_1 = document.querySelector('[data-node-id="71:936"]');
          const text1_2 = document.querySelector('[data-node-id="71:934"]');
          const text1_3 = document.querySelector('[data-node-id="71:935"]');

          const photo2 = document.querySelector('[data-node-id="71:931"]');
          const text2_1 = document.querySelector('[data-node-id="71:944"]');
          const text2_2 = document.querySelector('[data-node-id="71:942"]');
          const text2_3 = document.querySelector('[data-node-id="71:943"]');

          const photo3 = document.querySelector('[data-node-id="71:930"]');
          const text3_1 = document.querySelector('[data-node-id="71:940"]');
          const text3_2 = document.querySelector('[data-node-id="71:938"]');
          const text3_3 = document.querySelector('[data-node-id="71:939"]');

          setTimeout(() => {
            if (photo1) photo1.classList.add('visible');
            if (text1_1) text1_1.classList.add('visible');
            if (text1_2) text1_2.classList.add('visible');
            if (text1_3) text1_3.classList.add('visible');
          }, 200);

          setTimeout(() => {
            if (photo2) photo2.classList.add('visible');
            if (text2_1) text2_1.classList.add('visible');
            if (text2_2) text2_2.classList.add('visible');
            if (text2_3) text2_3.classList.add('visible');
          }, 400);

          setTimeout(() => {
            if (photo3) photo3.classList.add('visible');
            if (text3_1) text3_1.classList.add('visible');
            if (text3_2) text3_2.classList.add('visible');
            if (text3_3) text3_3.classList.add('visible');
          }, 600);
        }
      }
    }`;
html = html.replace(oldAdvance, newAdvance);

// 2. Update triggerSectionAnimations(index === 1)
const oldTrigger = `        if (mainTitle) {
          setTimeout(() => { mainTitle.classList.add('visible'); }, 500);
        }

        resetTypewriter();

        setTimeout(() => {
          if (photo1) photo1.classList.add('visible');
          if (text1_1) text1_1.classList.add('visible');
          if (text1_2) text1_2.classList.add('visible');
          if (text1_3) text1_3.classList.add('visible');
        }, 700);

        setTimeout(() => {
          if (photo2) photo2.classList.add('visible');
          if (text2_1) text2_1.classList.add('visible');
          if (text2_2) text2_2.classList.add('visible');
          if (text2_3) text2_3.classList.add('visible');
        }, 900);

        setTimeout(() => {
          if (photo3) photo3.classList.add('visible');
          if (text3_1) text3_1.classList.add('visible');
          if (text3_2) text3_2.classList.add('visible');
          if (text3_3) text3_3.classList.add('visible');
        }, 1100);`;

const newTrigger = `        if (mainTitle) {
          setTimeout(() => { mainTitle.classList.add('visible'); }, 500);
        }

        resetTypewriter();
        if (window.typewriterIntervalId) {
            clearInterval(window.typewriterIntervalId);
        }

        setTimeout(() => {
            window.typewriterIntervalId = setInterval(() => {
                if (isTypewriterFinished) {
                    clearInterval(window.typewriterIntervalId);
                } else {
                    advanceTypewriter();
                }
            }, 30);
        }, 1200);`;
html = html.replace(oldTrigger, newTrigger);

// 3. Remove scroll interception (down)
const oldScrollDown = `        // Typewriter intercept
        if (activeSectionIndex === 1 && !isTypewriterFinished && section1EnterDirection === 'down') {
          if (globalScrollAccumulator > 30) {
            advanceTypewriter();
            globalScrollAccumulator = 0;
          }
          return;
        }`;
html = html.replace(oldScrollDown, '');

// 4. Remove scroll interception (up)
const oldScrollUp = `        // Typewriter intercept
        if (activeSectionIndex === 1 && !isTypewriterFinished && section1EnterDirection === 'up') {
          if (globalScrollAccumulator < -30) {
            advanceTypewriter();
            globalScrollAccumulator = 0;
          }
          return;
        }`;
html = html.replace(oldScrollUp, '');

fs.writeFileSync('product.html', html);
console.log('Update successful!');
