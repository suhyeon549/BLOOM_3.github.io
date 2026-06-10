const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

// 1. Auto-start injection
const idx1 = html.indexOf('resetTypewriter();');
if (idx1 !== -1) {
    const triggerEnd = html.indexOf('} else if (index === 2) {', idx1);
    const triggerStartStr = '        resetTypewriter();';
    
    // We replace from resetTypewriter() to just before index === 2
    const triggerCheck = html.substring(idx1, triggerEnd);

    const triggerReveal = `resetTypewriter();
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
            `;

    html = html.replace(triggerCheck, triggerReveal);
} else {
    throw new Error('resetTypewriter() not found');
}

// 2. Sequential reveal injection
const advanceIdx = html.indexOf('function advanceTypewriter() {');
if (advanceIdx !== -1) {
    const advanceEnd = html.indexOf('let lastScale = window.innerWidth', advanceIdx);
    let advanceBlock = html.substring(advanceIdx, advanceEnd);

    const targetReplace = `if (currentP >= typewriterTextData.length) {
          isTypewriterFinished = true;
        }`;

    const newReveal = `if (currentP >= typewriterTextData.length) {
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
        }`;

    advanceBlock = advanceBlock.replace(targetReplace, newReveal);
    
    // Also remove intercept logic if it's there
    html = html.substring(0, advanceIdx) + advanceBlock + html.substring(advanceEnd);
} else {
    throw new Error('advanceTypewriter not found');
}

fs.writeFileSync('product.html', html);
console.log('Fixed completely!');
