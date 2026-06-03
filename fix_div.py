import re

with open("c:/Bloom/BLOOM_3.github.io/product.html", "r", encoding="utf-8") as f:
    content = f.read()

# I need to fix the extra </div>.
# The current HTML has:
#           <div id="curation-arrow" class="curation-arrow" style="position: absolute; height: 6px; left: 1703px; top: 681px; width: 266px;">
#             <img alt="" src="assets/arrow1.png" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; max-width: none; object-fit: cover; pointer-events: none; width: 100%; height: 100%;" />
#           </div>
#         </div>
#         <div class="" data-node-id="71:1014" data-name="4. Product - Key Features" style="
#
# I need to replace `</div>\n        <div class="" data-node-id="71:1014"` 
# with `<div class="" data-node-id="71:1014"`

bad_html = """          <div id="curation-arrow" class="curation-arrow" style="position: absolute; height: 6px; left: 1703px; top: 681px; width: 266px;">
            <img alt="" src="assets/arrow1.png" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; max-width: none; object-fit: cover; pointer-events: none; width: 100%; height: 100%;" />
          </div>
        </div>
        <div class="" data-node-id="71:1014" data-name="4. Product - Key Features\""""

good_html = """          <div id="curation-arrow" class="curation-arrow" style="position: absolute; height: 6px; left: 1703px; top: 681px; width: 266px;">
            <img alt="" src="assets/arrow1.png" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; max-width: none; object-fit: cover; pointer-events: none; width: 100%; height: 100%;" />
          </div>
        <div class="" data-node-id="71:1014" data-name="4. Product - Key Features\""""

if bad_html in content:
    content = content.replace(bad_html, good_html)
else:
    print("Could not find exact string to replace. Trying regex...")
    content = re.sub(
        r'(<div id="curation-arrow".*?</div>)\s*</div>\s*(<div class="" data-node-id="71:1014")',
        r'\1\n        \2',
        content,
        flags=re.DOTALL
    )

with open("c:/Bloom/BLOOM_3.github.io/product.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
