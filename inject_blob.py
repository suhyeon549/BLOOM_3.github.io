import os

files = ['index.html', 'Team.html', 'product.html']
css_link = '    <link rel="stylesheet" href="liquid-blob.css">'
blob_html = '''
    <!-- Liquid Blob Cursor Component -->
    <div id="liquid-blob-wrapper" aria-hidden="true">
        <div class="blob-container" id="blob-main-container"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path id="blob-main" fill="var(--blob-color)"></path></svg></div>
        <div class="blob-container" id="blob-sat1-container"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path id="blob-sat1" fill="var(--blob-color)"></path></svg></div>
        <div class="blob-container" id="blob-sat2-container"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path id="blob-sat2" fill="var(--blob-color)"></path></svg></div>
    </div>
    <script src="liquid-blob.js"></script>
'''

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'liquid-blob.css' not in content:
        content = content.replace('</head>', css_link + '\n</head>')
    
    if 'liquid-blob.js' not in content:
        content = content.replace('</body>', blob_html + '</body>')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print('Injection complete.')
