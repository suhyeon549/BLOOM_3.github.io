import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add background-color: transparent to the bubble video
vid_pattern = r'(<video src="assets/bubble-video\.mp4" autoplay loop muted playsinline\s*style="[^"]*)("></video>)'
replacement = r'\1; background-color: transparent; border: none; outline: none;\2'
html = re.sub(vid_pattern, replacement, html)

# Add it to the container too just in case
container_pattern = r'(<div data-node-id="231:240" data-name="image 382"\s*style="[^"]*)(">\s*<video src="assets/bubble-video\.mp4")'
container_replacement = r'\1; background-color: transparent;\2'
html = re.sub(container_pattern, container_replacement, html)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Added transparent background to video")
