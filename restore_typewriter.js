const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// 1. Advance typewriter by 2 chars instead of 5
html = html.replace('currentChar += 5; // advance 5 chars', 'currentChar += 2; // advance 2 chars');

// 2. Add sequential reveal to advanceTypewriter
const typeWriterComplete = `        if (currentP >= typewriterTextData.length) {
          isTypewriterFinished = true;
`;

const sequentialReveal = `        if (currentP >= typewriterTextData.length) {
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
          }, 300);

          setTimeout(() => {
            if (photo2) photo2.classList.add('visible');
            if (text2_1) text2_1.classList.add('visible');
            if (text2_2) text2_2.classList.add('visible');
            if (text2_3) text2_3.classList.add('visible');
          }, 600);

          setTimeout(() => {
            if (photo3) photo3.classList.add('visible');
            if (text3_1) text3_1.classList.add('visible');
            if (text3_2) text3_2.classList.add('visible');
            if (text3_3) text3_3.classList.add('visible');
          }, 900);
`;

html = html.replace(typeWriterComplete, sequentialReveal);

// 3. Start typewriter automatically in triggerSectionAnimations for index === 1
const section1AnimOld = `      } else if (index === 1) {
        const title1 = document.querySelector('.feat-title-1');
        const title2 = document.querySelector('.feat-title-2');

        if (title1) title1.classList.add('visible');
        if (title2) setTimeout(() => title2.classList.add('visible'), 300);

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
        }, 1100);
      } else if (index === 2) {`;

const section1AnimNew = `      } else if (index === 1) {
        const title1 = document.querySelector('.feat-title-1');
        const title2 = document.querySelector('.feat-title-2');

        if (title1) title1.classList.add('visible');
        if (title2) setTimeout(() => title2.classList.add('visible'), 300);

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
          }, 50);
        }, 1200);
      } else if (index === 2) {`;

html = html.replace(section1AnimOld, section1AnimNew);

// 4. Remove typewriter intercept logic from handleGlobalScroll
// We need to carefully replace the typewriter intercept code in the global scroll down and up blocks.
// I'll just use regex to strip out the intercepts since they vary slightly in up/down

html = html.replace(/        \/\/ Typewriter intercept[\\s\\S]*?        let threshold/g, '        let threshold');

fs.writeFileSync('product.html', html);
console.log('Restored typewriter animations for Section 2 successfully!');
