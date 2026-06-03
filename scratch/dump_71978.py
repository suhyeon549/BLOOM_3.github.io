import re
html = open('product.html', encoding='utf-8').read()
m = re.search(r'<div[^>]*data-node-id="71:978"[^>]*>.*?</div>', html, re.DOTALL)
if m:
    print(m.group(0))
else:
    print("Not found")
