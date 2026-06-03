import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Extract curation-arrow
arrow_pattern = re.compile(r'<div id="curation-arrow"[\s\S]*?</div>\s*')
arrow_match = arrow_pattern.search(html)
if arrow_match:
    arrow_html = arrow_match.group(0)
    html = html.replace(arrow_html, '')
else:
    arrow_html = ""

# Add z-index: 5 to arrow
arrow_html = arrow_html.replace('style="position: absolute;', 'style="position: absolute; z-index: 5;')

# 2. Extract curation-cards-container and add z-index: 10
cards_pattern = re.compile(r'(<div data-node-id="227:219" id="curation-cards-container"[^>]*style="[^"]*)(">)')
html = cards_pattern.sub(r'\1; z-index: 10;\2', html)

# 3. Find curation-cards-container insertion point and insert arrow BEFORE it
insert_idx = html.find('<div data-node-id="227:219" id="curation-cards-container"')
if insert_idx != -1:
    html = html[:insert_idx] + arrow_html + html[insert_idx:]

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("DOM modified successfully.")
