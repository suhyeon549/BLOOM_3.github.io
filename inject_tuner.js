const fs = require('fs');
let html = fs.readFileSync('product.html', 'utf8');

const widget = `
<div id="temp-tuner" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; background: rgba(255,255,255,0.9); padding: 20px; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); font-family: sans-serif;">
  <p style="margin-bottom: 10px;"><strong>Card Position Tuner</strong></p>
  <label>Top: <input type="range" id="tuner-top" min="0" max="1000" value="330" oninput="document.querySelector('.hero-card-position-wrapper').style.top = this.value + 'px'; document.getElementById('top-val').innerText = this.value;"></label>
  <span id="top-val">330</span>px<br>
  <label style="margin-top:10px; display:block;">Left: <input type="range" id="tuner-left" min="0" max="1500" value="660" oninput="document.querySelector('.hero-card-position-wrapper').style.left = this.value + 'px'; document.getElementById('left-val').innerText = this.value;"></label>
  <span id="left-val">660</span>px
</div>
`;

if (!html.includes('temp-tuner')) {
    html = html.replace('</body>', widget + '</body>');
    fs.writeFileSync('product.html', html);
    console.log("Injected tuner");
} else {
    console.log("Tuner already exists");
}
