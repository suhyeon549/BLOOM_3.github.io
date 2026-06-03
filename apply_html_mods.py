import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Hide step2, step3, Component 7
for name in ['step2', 'step3', 'Component 7']:
    pattern = re.compile(f'(<div data-node-id="[^"]+" data-name="{name}"[^>]*style="[^"]*)(">)')
    html = pattern.sub(r'\1; display: none;\2', html)

# 2. Add next-button to Component 4
comp4_idx = html.find('data-name="Component 4"')
# Find the end of Component 4 (it has 3 buttons inside it, so we need to inject next-button before its closing div)
# We know Component 4 ends right before `<div data-node-id="231:245"`
end_comp4_idx = html.find('<div data-node-id="231:245"', comp4_idx)
if end_comp4_idx != -1:
    next_btn_html = """
              <div id="curation-next-btn" class="next-btn" style="position: absolute; display: flex; align-items: center; justify-content: center; top: 85%; right: 8.1%; left: 7.54%; height: 40px; background-color: black; color: white; border-radius: 4px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; cursor: pointer; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
                Next
              </div>
"""
    # Find the closing </div> of Component 4 which is right before end_comp4_idx
    insert_pos = html.rfind('</div>', comp4_idx, end_comp4_idx)
    if insert_pos != -1:
        html = html[:insert_pos] + next_btn_html + html[insert_pos:]

# 3. Add classes to text elements for sequential animation
# Text 1: DISCOVER YOUR SCENT MOOD
text1_idx = html.find('DISCOVER YOUR SCENT MOOD')
if text1_idx != -1:
    tag_start = html.rfind('<p', 0, text1_idx)
    if tag_start != -1:
        html = html[:tag_start] + html[tag_start:].replace('<p ', '<p class="curation-text-anim" id="curation-text-1" ', 1)

# Text 2: 선택한 기준을 기반으로
text2_idx = html.find('선택한 기준을 기반으로')
if text2_idx != -1:
    tag_start = html.rfind('<div', 0, text2_idx)
    if tag_start != -1:
        html = html[:tag_start] + html[tag_start:].replace('<div ', '<div class="curation-text-anim" id="curation-text-2" ', 1)

# Add class to Component 4
tag_start = html.find('<div data-node-id="231:244" data-name="Component 4"')
if tag_start != -1:
    html = html[:tag_start] + html[tag_start:].replace('<div ', '<div class="curation-text-anim" id="curation-question-card" ', 1)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML modifications applied.")
