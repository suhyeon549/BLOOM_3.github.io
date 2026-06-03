import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<p data-node-id="215:276"', '<p id="curation-preview-text" data-node-id="215:276"')

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Added ID to 215:276")
