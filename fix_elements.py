import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Extract curation-arrow and Phase 2 container
arrow_pattern = re.compile(r'<div id="curation-arrow"[\s\S]*?</div>\s*', re.MULTILINE)
arrow_match = arrow_pattern.search(html)
if arrow_match:
    arrow_html = arrow_match.group(0)
    html = html.replace(arrow_html, '')
else:
    arrow_html = ""

phase2_pattern = re.compile(r'<!-- Curation Result Phase 2 -->[\s\S]*?<div id="curation-result-container"[\s\S]*?</div>\s*</div>\s*', re.MULTILINE)
phase2_match = phase2_pattern.search(html)
if phase2_match:
    phase2_html = phase2_match.group(0)
    html = html.replace(phase2_html, '')
else:
    phase2_pattern = re.compile(r'<!-- Curation Result Phase 2 -->[\s\S]*?</div>\s*</div>\s*', re.MULTILINE)
    phase2_match = phase2_pattern.search(html)
    if phase2_match:
        phase2_html = phase2_match.group(0)
        html = html.replace(phase2_html, '')
    else:
        phase2_html = ""

# 2. Find where to insert them.
# We want them inside '5. Product-Use Case', which ends around 'Curation Preview'.
target_str = "Curation Preview\n            </p>"
idx = html.find(target_str)

if idx != -1:
    insertion_point = idx + len(target_str)
    
    insertion = '\n' + arrow_html + phase2_html + '\n'
    html = html[:insertion_point] + insertion + html[insertion_point:]
    
    with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed layout successfully.")
else:
    print("Could not find insertion point.")
