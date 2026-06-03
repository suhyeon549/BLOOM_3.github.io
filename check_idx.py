with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx1 = html.find('id="curation-cards-container"')
idx2 = html.find('Curation Preview')
print('Container start:', idx1, 'Preview:', idx2)
