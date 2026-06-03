import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

btn_html = """\n<div id="curation-next-btn" class="next-btn" style="position: absolute; display: flex; align-items: center; justify-content: center; top: 85%; right: 8.1%; left: 7.54%; height: 40px; background-color: black; color: white; border-radius: 4px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; opacity: 0; pointer-events: none; transition: opacity 0.5s ease-out; z-index: 100;">Next</div>\n"""

# Find data-node-id="215:237" and insert after its closing </div>
target_pattern = re.compile(r'(<p data-node-id="215:237"[^>]*>.*?</p>\s*</div>)', re.DOTALL)
html = target_pattern.sub(r'\1' + btn_html, html)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Button injected via regex.")
