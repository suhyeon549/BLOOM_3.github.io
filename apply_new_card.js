const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

const startStr = '<div class="prod-fade-up step-01" id="curation-card"';
const startIdx = html.indexOf(startStr);

if (startIdx !== -1) {
    let nextDiv = html.indexOf('</div>', startIdx);
    nextDiv = html.indexOf('</div>', nextDiv + 1); // 2nd div close
    nextDiv = html.indexOf('</div>', nextDiv + 1); // 3rd div close (which is the main one)
    
    // To be perfectly safe, I will search for the exact HTML I injected in inject_substeps_v3.js
    const oldHTML = `<div class="prod-fade-up step-01" id="curation-card" style="
                  position: absolute;
                  left: 40px;
                  bottom: 40px;
                  top: auto;
                  width: 600px;
                  height: 412px;
                  z-index: 10;
                  display: block;
                ">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                  <img alt="" src="assets/5d8ca2459e7b151d6334751bae70430184af934e.svg" style="
                      position: absolute;
                      display: block;
                      top: 0; right: 0; bottom: 0; left: 0;
                      width: 100%; height: 100%;
                    " />
                </div>
                <div style="
                    position: absolute;
                    left: 54px;
                    top: 120px;
                    color: #1e1e1e;
                    white-space: nowrap;
                  ">
                  <p id="curation-title" style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      font-weight: 600;
                      font-size: 36px;
                      letter-spacing: -2px;
                      line-height: 1.1;
                      margin: 0;
                      transition: opacity 0.5s ease;
                    ">
                    Step 01. Answer Your Mood
                  </p>
                  <p id="curation-desc" style="
                      font-family: 'Pretendard', sans-serif;
                      font-size: 20px;
                      letter-spacing: -0.6px;
                      line-height: 1.4;
                      margin-top: 20px;
                      white-space: normal;
                      width: 490px;
                      transition: opacity 0.5s ease;
                    ">
                    사용하고 싶은 기분, 날씨, 계절, 분위기를 선택합니다.
                  </p>
                </div>
              </div>`;

    const newHTML = `<div class="prod-fade-up step-01" id="curation-card" style="
                  position: absolute;
                  left: 40px;
                  bottom: 40px;
                  top: auto;
                  width: 600px;
                  height: 240px;
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
                <div style="position: absolute; top: 12px; left: 12px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                <div style="position: absolute; top: 12px; right: 12px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                <div style="position: absolute; bottom: 12px; left: 12px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                <div style="position: absolute; bottom: 12px; right: 12px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                
                <div style="color: #1e1e1e; z-index: 2; padding: 0 40px;">
                  <p id="curation-title" style="
                      font-family: 'Pretendard', 'Helvetica Neue', sans-serif;
                      font-weight: 700;
                      font-size: 26px;
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
                      margin-top: 14px;
                      transition: opacity 0.5s ease;
                      word-break: keep-all;
                    ">
                    사용하고 싶은 기분, 날씨, 계절, 분위기를 선택합니다.
                  </p>
                </div>
              </div>`;

    if (html.includes(oldHTML)) {
        html = html.replace(oldHTML, newHTML);
        fs.writeFileSync('product.html', html);
        console.log('Replaced successfully using exact match!');
    } else {
        // Fallback: replace using index
        let endIdx = html.indexOf('</div>', startIdx); // first internal div
        endIdx = html.indexOf('</div>', endIdx + 1); // second internal div
        endIdx = html.indexOf('</div>', endIdx + 1) + 6; // the main container
        
        let targetBlock = html.substring(startIdx, endIdx);
        // Make sure we got it
        html = html.substring(0, startIdx) + newHTML + html.substring(endIdx);
        fs.writeFileSync('product.html', html);
        console.log('Replaced successfully using index fallback!');
    }
} else {
    console.log('Could not find curation-card');
}
