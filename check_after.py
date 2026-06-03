with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

start = html.find('id="curation-cards-container"')
end = html.find('id="curation-arrow"')
content = html[start:end]

print("Length between container and arrow:", len(content))

if 'pointer-events' in content:
    print("Found pointer-events in the gap!")
    
# Let's see what else is in there
import re
divs = re.findall(r'<div[^>]*>', content)
for div in divs:
    if 'style' in div and 'width: 100%' in div:
        print("Potential overlay:", div)
