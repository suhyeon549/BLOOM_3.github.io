with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('data-name="Component 4"')
print(html[idx:idx+3500])
