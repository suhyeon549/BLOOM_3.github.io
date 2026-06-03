import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_script = """// Seamless loop fix for bubble-video
    document.addEventListener("DOMContentLoaded", function() {
      const bubbleVid = document.querySelector('video[src="assets/bubble-video.mp4"]');
      if (bubbleVid) {
        function checkLoop() {
          if (bubbleVid.duration && bubbleVid.currentTime >= bubbleVid.duration - 0.5) {
            bubbleVid.currentTime = 0.1;
            bubbleVid.play().catch(e => console.log(e));
          }
          requestAnimationFrame(checkLoop);
        }
        requestAnimationFrame(checkLoop);
      }
    });
  </script>"""

html = re.sub(r'// Seamless loop fix for bubble-video.*?</script>', new_script, html, flags=re.DOTALL)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated video loop logic")
