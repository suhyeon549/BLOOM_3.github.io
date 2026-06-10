const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// Fix currentChar += 2
html = html.replace('currentChar += 5; // advance 5 chars', 'currentChar += 2; // advance 2 chars');

// Inject sequential reveal inside advanceTypewriter
const typeWriterCheck = `      if (currentChar >= targetText.length) {
        currentP++;
        currentChar = 0;
        if (currentP >= typewriterTextData.length) {
          isTypewriterFinished = true;
        }
      }`;

const typeWriterReveal = `      if (currentChar >= targetText.length) {
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
        }
      }`;

html = html.replace(typeWriterCheck, typeWriterReveal);

// Inject auto-start interval inside triggerSectionAnimations(index === 1)
const triggerCheck = `        if (mainTitle) {
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
        }, 1100);
            } else if (index === 2) {`;

const triggerReveal = `        if (mainTitle) {
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
          }, 50);
        }, 1200);
            } else if (index === 2) {`;

html = html.replace(triggerCheck, triggerReveal);

fs.writeFileSync('product.html', html);
console.log('Restored typewriter accurately!');
