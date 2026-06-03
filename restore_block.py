with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace("// Curation section intercept removed as it's now click-based.",
                    """// Block scroll down in curation section until completed
        if (activeSectionIndex === 4) {
          globalScrollAccumulator = 0;
          return;
        }""")

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
