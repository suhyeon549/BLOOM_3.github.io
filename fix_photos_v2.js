const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

const newCode = `if (currentChar >= targetText.length) {
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

const advanceIdx = html.indexOf('function advanceTypewriter() {');
const advanceEnd = html.indexOf('let lastScale = window.innerWidth', advanceIdx);

let block = html.substring(advanceIdx, advanceEnd);

const regex = /if\s*\(\s*currentChar\s*>=\s*targetText\.length\s*\)\s*\{\s*currentP\+\+;\s*currentChar\s*=\s*0;\s*if\s*\(\s*currentP\s*>=\s*typewriterTextData\.length\s*\)\s*\{\s*isTypewriterFinished\s*=\s*true;\s*\}\s*\}/;

if (regex.test(block)) {
    block = block.replace(regex, newCode);
    html = html.substring(0, advanceIdx) + block + html.substring(advanceEnd);
    fs.writeFileSync('product.html', html);
    console.log('Injected successfully!');
} else {
    console.log('Regex did not match!');
}
