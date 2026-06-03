import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Find and extract the button
btn_pattern = re.compile(r'<div id="curation-next-btn"[^>]*>.*?</div>', re.DOTALL)
match = btn_pattern.search(html)
if match:
    # Remove from current location
    html = html[:match.start()] + html[match.end():]

# 2. Find Component 4 end again
idx = html.find('id="curation-question-card"')
if idx != -1:
    div_start = html.rfind('<div', 0, idx)
    count = 0
    i = div_start
    while i < len(html):
        if html.startswith('<div', i):
            count += 1
            i += 4
        elif html.startswith('</div', i):
            count -= 1
            if count == 0:
                # Found the end. Insert the original button right before it
                original_btn = """<div id="curation-next-btn" class="next-btn" style="position: absolute; display: flex; align-items: center; justify-content: center; top: 85%; right: 8.1%; left: 7.54%; height: 40px; background-color: black; color: white; border-radius: 4px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; opacity: 0; pointer-events: none; transition: opacity 0.5s ease-out;">Next</div>"""
                html = html[:i] + original_btn + '\n' + html[i:]
                break
            i += 5
        else:
            i += 1

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Reverted button to original location inside Component 4.")
