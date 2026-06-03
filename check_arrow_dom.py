with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('id="curation-arrow"')
print(html[idx:idx+200])
