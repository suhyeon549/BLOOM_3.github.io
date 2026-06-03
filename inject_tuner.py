import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add ID to Curation Preview text
idx = html.find('Curation Preview')
if idx != -1:
    tag_start = html.rfind('<p', 0, idx)
    if 'id=' not in html[tag_start:idx]:
        html = html[:tag_start] + html[tag_start:].replace('<p ', '<p id="curation-preview-text" ', 1)

# Inject the control panel just before </body>
control_panel = """
  <!-- TEMPORARY CONTROL PANEL FOR POSITION TUNING -->
  <div id="position-tuner" style="position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 10px; z-index: 9999; font-family: sans-serif; display: flex; flex-direction: column; gap: 10px;">
    <h3 style="margin: 0; font-size: 16px;">Layout Tuner</h3>
    
    <label>
      Texts X-Position (Left): <span id="val-texts-x">40</span>px<br>
      <input type="range" id="slider-texts-x" min="0" max="500" value="40" style="width: 250px;">
    </label>
    
    <label>
      Cards Y-Position (padding-top): <span id="val-cards-y">459</span>px<br>
      <input type="range" id="slider-cards-y" min="0" max="800" value="459" style="width: 250px;">
    </label>

    <label>
      Curation Preview Y-Position (Top): <span id="val-preview-y">393</span>px<br>
      <input type="range" id="slider-preview-y" min="0" max="800" value="393" style="width: 250px;">
    </label>
  </div>

  <script>
    document.getElementById('slider-texts-x').addEventListener('input', (e) => {
      const val = e.target.value;
      document.getElementById('val-texts-x').innerText = val;
      const t1 = document.getElementById('curation-text-1');
      const t2 = document.getElementById('curation-text-2');
      if (t1) t1.style.left = val + 'px';
      if (t2) t2.style.left = val + 'px';
    });

    document.getElementById('slider-cards-y').addEventListener('input', (e) => {
      const val = e.target.value;
      document.getElementById('val-cards-y').innerText = val;
      const container = document.getElementById('curation-cards-container');
      if (container) container.style.paddingTop = val + 'px';
    });

    document.getElementById('slider-preview-y').addEventListener('input', (e) => {
      const val = e.target.value;
      document.getElementById('val-preview-y').innerText = val;
      const preview = document.getElementById('curation-preview-text');
      if (preview) preview.style.top = val + 'px';
    });
  </script>
"""

html = html.replace('</body>', control_panel + '\n</body>')

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Control panel injected.")
