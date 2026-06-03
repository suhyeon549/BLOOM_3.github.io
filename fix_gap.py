import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove gap: 18px from curation-cards-container
html = html.replace('gap: 18px;', 'gap: 0px;')

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('c:/Bloom/BLOOM_3.github.io/interactions.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Update curation-dynamic-card.revealed to add margin-left
css = css.replace('.curation-dynamic-card.revealed {\n  width: 358px !important;\n  opacity: 1;\n  overflow: visible;\n}',
""".curation-dynamic-card.revealed {
  width: 358px !important;
  margin-left: 18px;
  opacity: 1;
  overflow: visible;
}""")
# Also make sure to add margin-left transition to the base class
css = css.replace('transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);',
                  'transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), margin-left 0.6s cubic-bezier(0.4, 0, 0.2, 1);')

with open('c:/Bloom/BLOOM_3.github.io/interactions.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Gap logic fixed.")
