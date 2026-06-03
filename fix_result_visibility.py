import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove display: none; from curation-result-container
html = html.replace('z-index: 20; display: none;">', 'z-index: 20;">')

# 2. Add logic to make the container visible in JS (just in case it was hidden, but now it's always visible but opacity 0 is handled by children)
# Wait, if the container has no display: none, it's just there. The children are opacity: 0 and pointer-events are managed.
# Let's ensure the JS adds the classes.
js_replace = """              const resultContainer = document.getElementById('curation-result-container');
              if (resultContainer) {
                  resultContainer.style.pointerEvents = 'auto';
              }
              const card1 = document.getElementById('curation-result-card-1');"""
html = html.replace("const card1 = document.getElementById('curation-result-card-1');", js_replace)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Fixed result container visibility")
