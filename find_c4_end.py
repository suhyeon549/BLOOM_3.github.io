import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('id="curation-question-card"')
if idx != -1:
    # Find start of this div
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
                print('Found end of Component 4 at:', i)
                break
            i += 5
        else:
            i += 1
