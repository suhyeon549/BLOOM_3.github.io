with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('data-name="4. Product - Key Features"')
print(html[idx-100:idx+300])
