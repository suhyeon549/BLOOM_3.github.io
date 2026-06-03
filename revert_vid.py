import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove the dual video container
dual_vid_pattern = r'<div data-node-id="231:240" data-name="image 382" id="bubble-bg-container".*?</div>'
simple_vid = """<div data-node-id="231:240" data-name="image 382"
            style="position: absolute; height: 1280px; left: 0px; top: -105px; width: 1920px;">
            <video src="assets/bubble-video.mp4" autoplay loop muted playsinline
              style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; object-fit: cover; pointer-events: none; width: 100%; height: 100%;"></video>
          </div>"""
html = re.sub(dual_vid_pattern, simple_vid, html, flags=re.DOTALL)

# 2. Remove the custom JS script completely
js_pattern = r'// Seamless loop fix for bubble-video - Dual Video Crossfade.*?</script>'
html = re.sub(js_pattern, '</script>', html, flags=re.DOTALL)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Reverted to simple video tag like index.html")
