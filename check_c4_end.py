with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

end = 40388
print(html[max(0, end-500):min(len(html), end+100)])
