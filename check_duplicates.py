with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
print("card 1 count:", len(re.findall(r'id="curation-result-card-1"', html)))
print("card 2 count:", len(re.findall(r'id="curation-result-card-2"', html)))
print("card 3 count:", len(re.findall(r'id="curation-result-card-3"', html)))
