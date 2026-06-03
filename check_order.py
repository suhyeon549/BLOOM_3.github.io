with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

names = ['1. Product-Hero', '2. Product-Problem', '3. Product-How it works', '4. Product - Key Features', '5. Product-Use Case', '6. Product-CTA', '7. Product-Footer']
for name in names:
    print(name, html.find('data-name="' + name + '"'))
