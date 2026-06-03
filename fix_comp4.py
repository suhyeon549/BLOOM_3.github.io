import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix Component 4
old_style = 'style="position: absolute; height: 437px; left: 217px; top: 459px; width: 358px;"'
new_style = 'style="position: relative; height: 437px; width: 358px;"'
html = html.replace(old_style, new_style)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Component 4 style fixed.")
