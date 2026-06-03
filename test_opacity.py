with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
html = re.sub(r'id="curation-result-card-1".*?opacity: 0;', lambda m: m.group(0).replace('opacity: 0;', 'opacity: 1; z-index: 100;'), html)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
