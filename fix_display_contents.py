with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the style of curation-cards-container
old_style = 'style="position: absolute; display: contents; left: 217px; top: 393px;"'
new_style = 'style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"'
html = html.replace(old_style, new_style)

# Also ensure transition is set! The CSS uses ID so we just need to make sure the style attribute is correct.
# Actually, the CSS #curation-cards-container has transition defined, so we don't need it inline.

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Fixed display:contents bug")
