import re
with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()
res = re.search(r'setTimeout\(\(\) => \{\s*console\.log\(\"Cards slided out.*?\).*?\}, \d+\);', html, re.DOTALL)
if res:
    print(res.group(0))
else:
    print('Not found')
