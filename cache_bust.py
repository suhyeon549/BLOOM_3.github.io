import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add cache buster to video
html = html.replace('src="assets/bubble-video.mp4"', 'src="assets/bubble-video.mp4?v=3"')

# Add cache buster to cards
html = html.replace('src="assets/card1.png"', 'src="assets/card1.png?v=3"')
html = html.replace('src="assets/card2.png"', 'src="assets/card2.png?v=3"')
html = html.replace('src="assets/card3.png"', 'src="assets/card3.png?v=3"')

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Added cache busters")
