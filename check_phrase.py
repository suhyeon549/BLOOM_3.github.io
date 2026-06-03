with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('class="phrase-line"')
if idx != -1:
    print(html[idx-100:idx+200])
else:
    print('Not found')
