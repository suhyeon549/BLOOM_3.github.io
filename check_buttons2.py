import re
with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

matches = re.finditer(r'data-name="(button\d{2})"', html)
for m in matches:
    start = max(0, m.start() - 50)
    end = min(len(html), m.end() + 50)
    print(html[start:end])
