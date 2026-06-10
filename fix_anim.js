const fs = require('fs');

let html = fs.readFileSync('product.html', 'utf8');

const targetBlockStart = `        resetTypewriter();`;
const targetBlockEnd = `        setTimeout(() => {
          if (photo3) photo3.classList.add('visible');
          if (text3_1) text3_1.classList.add('visible');
          if (text3_2) text3_2.classList.add('visible');
          if (text3_3) text3_3.classList.add('visible');
        }, 1100);`;

const replacementBlock = `        resetTypewriter();
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

let startIndex = html.indexOf(targetBlockStart);
// specifically look after index === 1
startIndex = html.indexOf(targetBlockStart, html.indexOf('} else if (index === 1) {'));

if (startIndex !== -1) {
    let endIndex = html.indexOf(targetBlockEnd, startIndex);
    if (endIndex !== -1) {
        html = html.substring(0, startIndex) + replacementBlock + html.substring(endIndex + targetBlockEnd.length);
        fs.writeFileSync('product.html', html);
        console.log('Fixed triggerSectionAnimations correctly!');
    } else {
        console.log('End index not found');
    }
} else {
    console.log('Start index not found');
}
