with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('id="curation-preview-text"')
if idx != -1:
    print(html[max(0, idx-100):idx+300])
else:
    print("Not found")
