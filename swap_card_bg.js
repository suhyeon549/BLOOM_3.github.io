const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

const oldCard = `<div class="prod-fade-up step-01" id="curation-card" style="
                  position: absolute;
                  left: 40px;
                  bottom: 40px;
                  top: auto;
                  width: 580px;
                  height: 260px;
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
                <div style="position: absolute; top: 16px; left: 16px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                <div style="position: absolute; top: 16px; right: 16px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                <div style="position: absolute; bottom: 16px; left: 16px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>
                <div style="position: absolute; bottom: 16px; right: 16px; width: 6px; height: 6px; background-color: #1e1e1e; border-radius: 50%;"></div>`;

const newCard = `<div class="prod-fade-up step-01" id="curation-card" style="
                  position: absolute;
                  left: 40px;
                  bottom: 40px;
                  top: auto;
                  width: 580px;
                  height: 260px;
                  z-index: 10;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  box-sizing: border-box;
                  background-color: transparent;
                ">
                <!-- SVG Background -->
                <img alt="" src="assets/9fba4b67ddf225463bc68b74f91a73cb3f328d99.svg" style="
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
                    pointer-events: none;
                " />`;

if (html.includes(oldCard)) {
    html = html.replace(oldCard, newCard);
    fs.writeFileSync('product.html', html);
    console.log('Successfully replaced background with SVG!');
} else {
    console.log('Failed to find old card HTML');
}
