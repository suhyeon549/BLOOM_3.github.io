import re
with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

matches = re.findall(r'<div[^>]*class="[^"]*curation-btn[^"]*"[^>]*>[\s\S]*?</p>', html)
for m in matches:
    print(m.strip().replace('\n', ' '))
