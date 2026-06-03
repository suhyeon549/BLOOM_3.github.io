import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update values
# a) Texts Left: 40px (already 40px, but I'll ensure it is)
# We can skip this since it was already 40px, or we can replace it.
# Actually, the user says "Texts Left: 40px", so I will just leave it.

# b) Cards Padding-Top: 383px
html = re.sub(r'padding-top: \d+px;', 'padding-top: 383px;', html)

# c) Preview Top: 343px
html = re.sub(r'top: \d+px; letter-spacing: -0\.54px; text-transform: uppercase;', 'top: 343px; letter-spacing: -0.54px; text-transform: uppercase;', html)

# 2. Extract and move Next Button
# Find curation-next-btn
btn_pattern = re.compile(r'<div id="curation-next-btn".*?</div>', re.DOTALL)
match = btn_pattern.search(html)
if match:
    btn_html = match.group(0)
    # Remove it from current location
    html = html[:match.start()] + html[match.end():]
    
    # We want to place it in the Section 5 wrapper, perfectly centered.
    # We can place it at the very bottom of curation-cards-container or just inside the main section.
    # It should be placed near the end of section 5. Let's find <!-- Curation Result Phase 2 -->
    insert_idx = html.find('<!-- Curation Result Phase 2 -->')
    if insert_idx != -1:
        # Update button inline style to center it at the bottom.
        # Original: style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); ... "
        # Wait, if we place it outside, we can position it perfectly centered relative to the whole viewport.
        # "카드 아래 약간 간격 두고 위치시키면 될 것 같아."
        # Cards padding-top is 383px. Card height is 484px. Bottom is 867px.
        # So top: 900px is perfect.
        # Let's add top: 900px;
        # Wait, the original button had `bottom: 30px;`. I should replace `bottom: \d+px;` with `top: 900px;`.
        new_btn_html = re.sub(r'bottom:\s*[^;]+;', 'top: 900px;', btn_html)
        
        # Insert before <!-- Curation Result Phase 2 -->
        html = html[:insert_idx] + new_btn_html + '\n' + html[insert_idx:]

# 3. Remove Tuner
tuner_start = html.find('<!-- TEMPORARY CONTROL PANEL')
if tuner_start != -1:
    tuner_end = html.find('</script>', tuner_start) + 9
    html = html[:tuner_start] + html[tuner_end:]

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated values, moved button, and removed tuner.")
