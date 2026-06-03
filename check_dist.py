with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx1 = html.find('id="curation-cards-container"')
idx2 = html.find('id="curation-arrow"')
print('Distance:', idx2 - idx1)
