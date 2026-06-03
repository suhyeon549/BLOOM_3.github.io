import re
import os

filepath = r"c:\Bloom\BLOOM_3.github.io\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Change canvas and scaler height 6900 -> 7260
content = content.replace("height: 6900px;", "height: 7260px;")
content = content.replace("6900 * scale", "7260 * scale")
content = content.replace("'6900px'", "'7260px'")

# 2. Change 2. Main-Problem height
# find the exact string to replace
old_main_problem = 'data-node-id="71:743" data-name="2. Main-Problem"\n                    style="position: absolute; background-color: white; height: 1080px; left: 0; overflow: hidden; top: 1080px;'
new_main_problem = 'data-node-id="71:743" data-name="2. Main-Problem"\n                    style="position: absolute; background-color: white; height: 1440px; left: 0; overflow: hidden; top: 1080px;'
content = content.replace(old_main_problem, new_main_problem)

# 3. Adjust top positions of all subsequent sections
# We need to find `top: Xpx;` and if X >= 2160, add 360.
# Because the layout uses top: 2160px, top: 3240px, top: 4320px, etc.
def shift_top(match):
    top_val = int(match.group(1))
    if top_val >= 2160:
        return f"top: {top_val + 360}px"
    return match.group(0)

# We have `top: 2160px;` and also `top: 4224px;` for image 362, `top: 5400px;`, `top: 6480px;`.
# We shouldn't match random elements inside components, ONLY those whose top values are high enough.
# Since all sub-elements use `top` relative to their parent container (e.g. `top: 40px`), 
# any `top` >= 2160 is definitely a top-level container that needs shifting.
content = re.sub(r'top:\s*(\d+)px', shift_top, content)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully.")
