import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace curation-result-card-1
card1_pattern = r'<div class="curation-result-card" id="curation-result-card-1"[^>]*>.*?</div>\s*</div>'
card1_replacement = """<img class="curation-result-card" id="curation-result-card-1" src="assets/card1.png" style="position: absolute; left: 262px; top: 400px; width: 450px; height: 549px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); opacity: 0; filter: blur(24px); transform: translateY(40px);">"""
html = re.sub(card1_pattern, card1_replacement, html, flags=re.DOTALL)

# Replace curation-result-card-2
card2_pattern = r'<div class="curation-result-card" id="curation-result-card-2"[^>]*>.*?</div>\s*</div>'
card2_replacement = """<img class="curation-result-card" id="curation-result-card-2" src="assets/card2.png" style="position: absolute; left: 733px; top: 400px; width: 451px; height: 549px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); opacity: 0; filter: blur(24px); transform: translateY(40px);">"""
html = re.sub(card2_pattern, card2_replacement, html, flags=re.DOTALL)

# Replace curation-result-card-3
card3_pattern = r'<div class="curation-result-card" id="curation-result-card-3"[^>]*>.*?</div>\s*</div>'
card3_replacement = """<img class="curation-result-card" id="curation-result-card-3" src="assets/card3.png" style="position: absolute; left: 1207px; top: 400px; width: 451px; height: 549px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); opacity: 0; filter: blur(24px); transform: translateY(40px);">"""
html = re.sub(card3_pattern, card3_replacement, html, flags=re.DOTALL)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated cards to be simple image tags")
