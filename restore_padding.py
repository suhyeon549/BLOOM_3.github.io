import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix the ruined padding-top: 383px; back to 12px or 13px depending on padding-bottom
def repl_padding(m):
    full_match = m.group(0)
    # The container uses gap: 0px or similar near it, let's just check if it's the container
    if 'id="curation-cards-container"' in full_match:
        return full_match # Keep 383px for container
    
    # Otherwise, it's a button. Let's see if padding-bottom is 12 or 13.
    if 'padding-bottom: 13px' in full_match:
        return full_match.replace('padding-top: 383px;', 'padding-top: 13px;')
    else:
        return full_match.replace('padding-top: 383px;', 'padding-top: 12px;')

# We will match a larger block to inspect the context
html = re.sub(r'[^>]+padding-top: 383px;[^>]+>', repl_padding, html)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Paddings restored.")
