import re

with open("c:/Bloom/BLOOM_3.github.io/product.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace STEP X with 0X
content = re.sub(r'STEP 1\s*</p>', r'01\n              </p>', content)
content = re.sub(r'STEP 2\s*</p>', r'02\n              </p>', content)
content = re.sub(r'STEP 3\s*</p>', r'03\n              </p>', content)
content = re.sub(r'STEP 4\s*</p>', r'04\n              </p>', content)

# 2. Remove buttons for "산뜻하게 시작하고 싶을 때" and "어두운 날"
# Button 10:
# <div data-node-id="218:54" data-name="button10" ...>
#   <p ...>산뜻하게 시작하고 싶을 때</p>
# </div>
button10_pattern = re.compile(r'<div data-node-id="218:54"[^>]*>.*?산뜻하게 시작하고 싶을 때.*?</p>\s*</div>', re.DOTALL)
content = button10_pattern.sub('', content)

# Button 05:
button05_pattern = re.compile(r'<div data-node-id="218:68"[^>]*>.*?어두운 날.*?</p>\s*</div>', re.DOTALL)
content = button05_pattern.sub('', content)

# 3. Add curation-btn class and remove background: #f4f4f4;
def replace_button(match):
    before = match.group(1)
    style = match.group(2)
    new_style = style.replace('background: #f4f4f4;', '')
    # Add transition cursor etc to inline or we can use the css class.
    # We will use css class.
    return f'{before} class="curation-btn" style="{new_style}"'

button_pattern = re.compile(r'(<div[^>]*data-name="button\d\d"[^>]*?)style="([^"]*)"')
content = button_pattern.sub(replace_button, content)

# 4. Add CSS styles to the head
css = """
    .curation-btn {
      background-color: #f4f4f4 !important;
      transition: background-color 0.2s ease, color 0.2s ease;
      cursor: pointer;
    }
    .curation-btn:hover {
      background-color: #e0e0e0 !important;
    }
    .curation-btn.selected {
      background-color: #000000 !important;
    }
    .curation-btn.selected p {
      color: #ffffff !important;
    }
"""
if ".curation-btn {" not in content:
    content = content.replace('</style>', css + '</style>')

# 5. Add JS to toggle selected class
js = """
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.curation-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
      });
    });
  });
</script>
</body>
"""
if "const btns = document.querySelectorAll('.curation-btn');" not in content:
    content = content.replace('</body>', js)

with open("c:/Bloom/BLOOM_3.github.io/product.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
