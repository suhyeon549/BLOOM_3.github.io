import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add ID to Curation Preview text properly
idx = html.find('Curation Preview')
if idx != -1:
    # find the previous '<p data-node-id='
    tag_start = html.rfind('<p data-node-id=', 0, idx)
    if tag_start != -1 and 'id=' not in html[tag_start:idx]:
        # Insert id right after '<p '
        html = html[:tag_start] + html[tag_start:].replace('<p ', '<p id="curation-preview-text" ', 1)

# 2. Add Copy button to tuner
old_panel = """</label>
  </div>"""

new_panel = """</label>
    <button id="tuner-copy-btn" style="margin-top: 10px; padding: 5px; background: white; color: black; border: none; cursor: pointer; border-radius: 4px;">Copy values</button>
  </div>"""

html = html.replace(old_panel, new_panel)

# 3. Add JS for copy button
old_js = """if (preview) preview.style.top = val + 'px';
    });
  </script>"""

new_js = """if (preview) preview.style.top = val + 'px';
    });
    
    document.getElementById('tuner-copy-btn').addEventListener('click', () => {
      const v1 = document.getElementById('val-texts-x').innerText;
      const v2 = document.getElementById('val-cards-y').innerText;
      const v3 = document.getElementById('val-preview-y').innerText;
      const text = `Texts Left: ${v1}px\\nCards Padding-Top: ${v2}px\\nPreview Top: ${v3}px`;
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied!\\n" + text);
      });
    });
  </script>"""

html = html.replace(old_js, new_js)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Tuner fixed and Copy button added.")
