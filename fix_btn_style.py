import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the exact curation-next-btn tag with fixed styles
old_btn_pattern = re.compile(r'<div id="curation-next-btn"[^>]*>.*?</div>', re.DOTALL)
new_btn = """<div id="curation-next-btn" class="next-btn" style="position: absolute; display: flex; align-items: center; justify-content: center; top: 900px; left: 50%; transform: translateX(-50%); width: 250px; height: 50px; background-color: black; color: white; border-radius: 4px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; cursor: pointer; opacity: 0; pointer-events: none; transition: opacity 0.5s ease-out; z-index: 100;">Next</div>"""

html = old_btn_pattern.sub(new_btn, html)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Button style fixed.")
