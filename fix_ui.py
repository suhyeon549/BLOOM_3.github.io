import re

with open(r'c:\Bloom\BLOOM_3.github.io\product.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Insert "※ 중복 선택 가능"
content = content.replace(
    '''어떤 기준으로<br/>비누를 고르고 싶나요?
            </div>''',
    '''어떤 기준으로<br/>비누를 고르고 싶나요?
            </div>
            <p style="position: absolute; top: 154px; left: 26px; font-family: 'Pretendard', sans-serif; font-weight: 400; font-size: 12px; color: #1e1e1e; margin: 0;">※ 중복 선택 가능</p>'''
)

# 2. Change STEP 1 -> 01, etc.
content = content.replace('STEP 1</p>', '01</p>')
content = content.replace('STEP 2</p>', '02</p>')
content = content.replace('STEP 3</p>', '03</p>')
content = content.replace('STEP 4</p>', '04</p>')

# 3. Remove background image and change background color
content = content.replace('background-color: white;\n              height: 1080px;\n              left: 0;\n              overflow: hidden;\n              top: 4200px;', 'background-color: #1e1e1e;\n              height: 1080px;\n              left: 0;\n              overflow: hidden;\n              top: 4200px;')

content = re.sub(r'<!-- Background Image -->\s*<img src="assets/5754a7001851bad66f314902447f78ea314d37fe\.png"[^>]*>\s*', '', content)

# 4. Remove card-scrollable and fixed heights
content = content.replace('class="card-scrollable" style="position: absolute; top: 188px; left: 26px; right: 26px; height: 230px;', 'style="position: absolute; top: 188px; left: 26px; right: 26px;')

# 5. Remove wheel intercept in JS
js_wheel_intercept = '''      // Allow internal scrolling for .card-scrollable
      const scrollableCard = e.target.closest('.card-scrollable');
      if (scrollableCard) {
        const isScrollingDown = e.deltaY > 0;
        const maxScroll = scrollableCard.scrollHeight - scrollableCard.clientHeight;
        
        if (isScrollingDown && scrollableCard.scrollTop < maxScroll) {
          return; // Native scroll down
        } else if (!isScrollingDown && scrollableCard.scrollTop > 0) {
          return; // Native scroll up
        }
      }

'''
content = content.replace(js_wheel_intercept, '')

with open(r'c:\Bloom\BLOOM_3.github.io\product.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Modifications applied successfully.")
