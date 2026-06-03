import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove z-index: -1; from the video container
html = html.replace('width: 1920px; z-index: -1;">', 'width: 1920px;">')

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Removed z-index: -1;")
