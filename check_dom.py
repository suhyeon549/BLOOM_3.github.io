with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'id="curation-cards-container"' in line or 'id="curation-result-container"' in line or 'data-name="4. Product - Key Features"' in line or '<!-- Curation Result Phase 2 -->' in line:
        print(f'{i+1}: {line.strip()}')
