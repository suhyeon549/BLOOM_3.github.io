import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the bubble video tag with one EXACTLY like the working one in index.html
vid_pattern = r'<video src="assets/bubble-video\.mp4"[^>]*></video>'
exact_match = """<video src="assets/bubble-video.mp4" autoplay loop muted playsinline style="position: absolute; height: 100%; left: 0; top: 0; width: 100%; object-fit: cover;"></video>"""
html = re.sub(vid_pattern, exact_match, html)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Made video tag EXACTLY like index.html")
