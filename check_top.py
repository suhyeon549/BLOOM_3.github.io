import re
with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

names = ['1. Product-Hero', '2. Product-Problem', '3. Product-How it works', '4. Product - Key Features', '5. Product-Use Case', '6. Product-CTA', '7. Product-Footer']
for name in names:
    pattern = r'data-name="' + re.escape(name) + r'" style="[^"]*top:\s*(\d+)px'
    match = re.search(pattern, html)
    top_val = match.group(1) if match else 'not found'
    print(name, 'Top:', top_val)
