import re
with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

matches = re.finditer(r'data-name="(Component 4|step2|step3|Component 7)"[^>]*style="[^"]*left:\s*([^;]+);', html)
for m in matches:
    print(m.group(1), m.group(2))
