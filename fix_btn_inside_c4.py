import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the button from its current broken place
btn_pattern = re.compile(r'<div id="curation-next-btn"[^>]*>.*?</div>', re.DOTALL)
html = btn_pattern.sub('', html)

# Insert the button exactly after data-node-id="215:237" 's closing </p> </div>
# Looking at the previous output:
#                 <p data-node-id="215:237"
#                   style="...">
#                   </p>
#               </div>
# We want to insert it right after this </div>.

insert_target = """<p data-node-id="215:237"
                  style="word-break: break-word; font-family: 'Pretendard', sans-serif; font-weight: 400; line-height: 1.4; font-style: normal; position: relative; flex-shrink: 0; color: #1e1e1e; font-size: 20px; letter-spacing: -0.6px; white-space: nowrap;">
                  </p>
              </div>"""

if insert_target in html:
    btn_html = """\n<div id="curation-next-btn" class="next-btn" style="position: absolute; display: flex; align-items: center; justify-content: center; top: 85%; right: 8.1%; left: 7.54%; height: 40px; background-color: black; color: white; border-radius: 4px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; opacity: 0; pointer-events: none; transition: opacity 0.5s ease-out;">Next</div>\n"""
    html = html.replace(insert_target, insert_target + btn_html)
else:
    print("Could not find insertion target.")

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Button correctly placed inside Component 4.")
