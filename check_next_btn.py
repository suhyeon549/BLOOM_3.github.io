with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()
idx = html.find('id="curation-next-btn"')
print(html[max(0, idx-300):idx+300])
