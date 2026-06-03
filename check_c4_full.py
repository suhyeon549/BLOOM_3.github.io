with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('data-name="Component 4"')
idx2 = html.find('data-name="step2"')
print(html[idx:idx2])
