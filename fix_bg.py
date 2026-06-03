import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Replace image 382 (bg-curation.png) with bubble-video.mp4
bg_img_pattern = r'<div data-node-id="231:240" data-name="image 382"[^>]*>\s*<img alt="" src="assets/bg-curation.png"[^>]*>\s*</div>'
bg_vid_replacement = """<div data-node-id="231:240" data-name="image 382"
            style="position: absolute; height: 1280px; left: 0px; top: -105px; width: 1920px; z-index: -1;">
            <video src="assets/bubble-video.mp4" autoplay loop muted playsinline preload="auto"
              style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; object-fit: cover; pointer-events: none; width: 100%; height: 100%;"></video>
          </div>"""
html = re.sub(bg_img_pattern, bg_vid_replacement, html, flags=re.IGNORECASE)

# 2. Replace color: white; with color: black; for curation-text-1 and curation-text-2
text2_pattern = r'(id="curation-text-2".*?)color:\s*white;'
html = re.sub(text2_pattern, r'\1color: black;', html, flags=re.DOTALL)

text1_pattern = r'(id="curation-text-1".*?)color:\s*white;'
html = re.sub(text1_pattern, r'\1color: black;', html, flags=re.DOTALL)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated video background and text colors.")
