import re
with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

matches = re.finditer(r'data-name="(step2|step3|Component 7)"[^>]*style="([^"]*)"', html)
for m in matches:
    print(m.group(1), m.group(2))
