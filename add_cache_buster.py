with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
html = re.sub(r'<link href="interactions\.css.*?rel="stylesheet" />', '<link href="interactions.css?v=5" rel="stylesheet" />', html)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
