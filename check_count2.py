with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()
print('curation-btn count:', html.count('curation-btn'))
print('curation-cards-container count:', html.count('id="curation-cards-container"'))
