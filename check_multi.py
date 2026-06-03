import re
with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()
matches = re.finditer('data-name="4. Product - Key Features"', html)
for m in matches:
    idx = m.start()
    print(f'Match at {idx}: {html[idx-50:idx+200]}')
