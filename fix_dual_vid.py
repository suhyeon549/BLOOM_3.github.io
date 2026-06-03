import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace old video element
old_vid_pattern = r'<div data-node-id="231:240" data-name="image 382"[^>]*>\s*<video src="assets/bubble-video\.mp4"[^>]*>\s*</video>\s*</div>'
new_vids = """<div data-node-id="231:240" data-name="image 382" id="bubble-bg-container"
            style="position: absolute; height: 1280px; left: 0px; top: -105px; width: 1920px; background-color: #fff;">
            <video id="bubble-vid-1" src="assets/bubble-video.mp4" autoplay muted playsinline preload="auto"
              style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; object-fit: cover; pointer-events: none; width: 100%; height: 100%; transition: opacity 0.5s ease-in-out; opacity: 1;"></video>
            <video id="bubble-vid-2" src="assets/bubble-video.mp4" muted playsinline preload="auto"
              style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; object-fit: cover; pointer-events: none; width: 100%; height: 100%; transition: opacity 0.5s ease-in-out; opacity: 0;"></video>
          </div>"""
html = re.sub(old_vid_pattern, new_vids, html, flags=re.DOTALL)

# Replace old script
old_script_pattern = r'// Seamless loop fix for bubble-video.*?</script>'
new_script = """// Seamless loop fix for bubble-video - Dual Video Crossfade
    document.addEventListener("DOMContentLoaded", function() {
      const vid1 = document.getElementById('bubble-vid-1');
      const vid2 = document.getElementById('bubble-vid-2');
      if (!vid1 || !vid2) return;

      let activeVid = vid1;
      let inactiveVid = vid2;
      let isSwapping = false;

      function checkLoop() {
        // Crossfade 0.8 seconds before the video ends to skip any trailing black frames
        if (!isSwapping && activeVid.duration && activeVid.currentTime >= activeVid.duration - 0.8) {
          isSwapping = true;
          inactiveVid.currentTime = 0;
          inactiveVid.play().catch(e => console.log(e));
          inactiveVid.style.opacity = '1';
          activeVid.style.opacity = '0';
          
          let temp = activeVid;
          activeVid = inactiveVid;
          inactiveVid = temp;
          
          setTimeout(() => {
            inactiveVid.pause();
            isSwapping = false;
          }, 600);
        }
        requestAnimationFrame(checkLoop);
      }
      requestAnimationFrame(checkLoop);
    });
  </script>"""
html = re.sub(old_script_pattern, new_script, html, flags=re.DOTALL)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Implemented Dual Video Crossfade Seamless Loop")
