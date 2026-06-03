with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()
print('Arrows:', html.count('id="curation-arrow"'))
print('Phase 2s:', html.count('id="curation-result-container"'))
