import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('id="curation-cards-container"')
if idx != -1:
    sub = html[idx:idx+16000]
    names = re.findall(r'data-name="([^"]+)"', sub)
    print(names)
