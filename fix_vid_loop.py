import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

vid_script = """
  <script>
    // Seamless loop fix for bubble-video
    document.addEventListener("DOMContentLoaded", function() {
      const bubbleVid = document.querySelector('video[src="assets/bubble-video.mp4"]');
      if (bubbleVid) {
        bubbleVid.addEventListener('timeupdate', function() {
          if (this.duration && this.currentTime >= this.duration - 0.2) {
            this.currentTime = 0.05;
            this.play();
          }
        });
      }
    });
  </script>
</body>"""

html = html.replace('</body>', vid_script)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Added seamless video loop fix")
