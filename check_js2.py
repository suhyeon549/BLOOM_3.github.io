with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find("const allBtns = document.querySelectorAll('.curation-btn');")
print(html[idx:idx+2500])
