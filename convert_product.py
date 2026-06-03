import re
import os
import urllib.request

with open('product_output.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

react_code = ""
in_code = False
for raw_line in lines:
    line = raw_line.strip()
    if "export default function ProductPage()" in line:
        in_code = True
    if in_code:
        # Match '123:     <div'
        m = re.match(r'^\d+:\s(.*)', raw_line.rstrip('\n\r'))
        if m:
            react_code += m.group(1) + "\n"
        else:
            react_code += raw_line
    if "302: }" in line or line == "}":
        break

# Clean up react shell
react_code = re.sub(r'export default function ProductPage\(\) \{\s*return \(\s*', '', react_code)
react_code = re.sub(r'\s*\);\s*\}\s*$', '', react_code)

constants = {}
for line in lines:
    m = re.search(r'const\s+(\w+)\s*=\s*"([^"]+)";', line)
    if m:
        constants[m.group(1)] = m.group(2)

html = react_code.replace("className=", "class=")

# Fix React self-closing non-void elements for HTML
html = re.sub(r'<div([^>]*?)/>', r'<div\1></div>', html)
html = re.sub(r'<span([^>]*?)/>', r'<span\1></span>', html)
html = re.sub(r'<p([^>]*?)/>', r'<p\1></p>', html)

# Replace the specific placeholder div with an actual video tag BEFORE applying CSS classes
video_placeholder = r'<div class="absolute h-\[1080px\] left-0 top-0 w-\[1920px\]" data-node-id="82:67"[^>]*></div>'
video_tag = r'<video class="absolute h-[1080px] left-0 top-0 w-[1920px] object-cover" data-node-id="82:67" src="assets/3.Main-Solution-Video.mp4" autoplay loop muted playsinline></video>'
html = re.sub(video_placeholder, video_tag, html)

os.makedirs('assets', exist_ok=True)
for var_name, url in constants.items():
    filename = url.split('/')[-1]
    
    filepath = os.path.join('assets', filename)
    if not os.path.exists(filepath):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            print(f"Downloading {filename} from {url}...")
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
        except Exception as e:
            print(f"Failed to download {filename}: {e}")
        
    html = html.replace(f"src={{{var_name}}}", f'src="assets/{filename}"')
    html = html.replace(f"url('${{{var_name}}}')", f"url('assets/{filename}')")

def class_to_style(classes_str):
    classes = classes_str.split()
    styles = []
    new_classes = []
    
    mapping = {
        'absolute': 'position: absolute;',
        'relative': 'position: relative;',
        'bg-white': 'background-color: white;',
        'bg-black': 'background-color: black;',
        'overflow-clip': 'overflow: hidden;',
        'overflow-hidden': 'overflow: hidden;',
        'size-full': 'width: 100%; height: 100%;',
        'w-full': 'width: 100%;',
        'min-w-full': 'min-width: 100%;',
        'max-w-none': 'max-width: none;',
        'h-full': 'height: 100%;',
        'h-0': 'height: 0;',
        'inset-0': 'top: 0; right: 0; bottom: 0; left: 0;',
        '-translate-x-1/2': 'transform: translateX(-50%);',
        'whitespace-nowrap': 'white-space: nowrap;',
        'whitespace-pre': 'white-space: pre-wrap;',
        'text-center': 'text-align: center;',
        'uppercase': 'text-transform: uppercase;',
        'pointer-events-none': 'pointer-events: none;',
        'object-cover': 'object-fit: cover;',
        'object-bottom': 'object-fit: cover; object-position: bottom;',
        'flex': 'display: flex;',
        'flex-col': 'flex-direction: column;',
        'items-start': 'align-items: flex-start;',
        'items-center': 'align-items: center;',
        'justify-center': 'justify-content: center;',
        'shrink-0': 'flex-shrink: 0;',
        'border-solid': 'border-style: solid;',
        'block': 'display: block;',
        'contents': 'display: contents;',
        'content-stretch': 'align-content: stretch;',
        'not-italic': 'font-style: normal;',
        'italic': 'font-style: italic;',
        'leading-none': 'line-height: 1;',
        'font-normal': 'font-weight: normal;',
        'mask-alpha': 'mask-type: alpha; -webkit-mask-type: alpha;',
        'mask-intersect': 'mask-composite: intersect; -webkit-mask-composite: intersect;',
        'mask-no-repeat': 'mask-repeat: no-repeat; -webkit-mask-repeat: no-repeat;',
        'mask-no-clip': 'mask-clip: border-box; -webkit-mask-clip: border-box;',
    }
    
    for cls in classes:
        if cls in mapping:
            styles.append(mapping[cls])
        elif cls.startswith('h-['):
            val = cls[3:-1]
            styles.append(f"height: {val};")
        elif cls.startswith('w-['):
            val = cls[3:-1]
            styles.append(f"width: {val};")
        elif cls.startswith('left-['):
            val = cls[6:-1].replace('+', ' + ').replace('-', ' - ')
            if 'calc' in val:
                val = val.replace('calc(', '').replace(')', '')
                styles.append(f"left: calc({val});")
            else:
                styles.append(f"left: {val};")
        elif cls == 'left-1/2':
            styles.append("left: 50%;")
        elif cls == 'left-0':
            styles.append("left: 0;")
        elif cls.startswith('top-['):
            val = cls[5:-1].replace('+', ' + ').replace('-', ' - ')
            if 'calc' in val:
                val = val.replace('calc(', '').replace(')', '')
                styles.append(f"top: calc({val});")
            else:
                styles.append(f"top: {val};")
        elif cls == 'top-0':
            styles.append("top: 0;")
        elif cls.startswith('text-['):
            val = cls[6:-1]
            if val.startswith('#'):
                styles.append(f"color: {val};")
            else:
                styles.append(f"font-size: {val};")
        elif cls.startswith('bg-['):
            val = cls[4:-1]
            styles.append(f"background-color: {val};")
        elif cls.startswith('tracking-['):
            val = cls[10:-1]
            styles.append(f"letter-spacing: {val};")
        elif cls.startswith('leading-['):
            val = cls[9:-1]
            styles.append(f"line-height: {val};")
        elif cls.startswith('font-['):
            val = cls[6:-1]
            val = val.replace("'", "").replace("_", " ")
            if 'Pretendard' in val:
                styles.append("font-family: 'Pretendard', sans-serif;")
                if 'SemiBold' in val:
                    styles.append("font-weight: 600;")
            elif 'Helvetica' in val:
                styles.append("font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;")
                if 'Medium' in val:
                    styles.append("font-weight: 500;")
                elif 'Bold' in val:
                    styles.append("font-weight: 700;")
            elif 'Playfair' in val:
                styles.append("font-family: 'Playfair Display', serif; font-style: italic;")
        elif cls.startswith('opacity-'):
            val = cls[8:]
            styles.append(f"opacity: {int(val)/100};")
        elif cls.startswith('gap-['):
            val = cls[5:-1]
            styles.append(f"gap: {val};")
        elif cls.startswith('px-['):
            val = cls[4:-1]
            styles.append(f"padding-left: {val}; padding-right: {val};")
        elif cls.startswith('py-['):
            val = cls[4:-1]
            styles.append(f"padding-top: {val}; padding-bottom: {val};")
        elif cls.startswith('rounded-['):
            val = cls[9:-1]
            styles.append(f"border-radius: {val};")
        elif cls == 'border':
            styles.append(f"border-width: 1px;")
        elif cls.startswith('border-['):
            val = cls[8:-1]
            styles.append(f"border-color: {val};")
        elif cls.startswith('[word-break:'):
            val = cls[12:-1]
            styles.append(f"word-break: {val};")
        elif cls == 'mb-0':
            styles.append("margin-bottom: 0;")
        elif cls.startswith('mask-position-['):
            val = cls[15:-1].replace('_', ' ')
            styles.append(f"mask-position: {val}; -webkit-mask-position: {val};")
        elif cls.startswith('mask-size-['):
            val = cls[11:-1].replace('_', ' ')
            styles.append(f"mask-size: {val}; -webkit-mask-size: {val};")
        elif cls.startswith('inset-['):
            val = cls[7:-1].replace('_', ' ')
            styles.append(f"inset: {val};")
        else:
            new_classes.append(cls)
            
    return ' '.join(new_classes), ' '.join(styles)

def replace_class(match):
    cls_str = match.group(1)
    new_cls, new_style = class_to_style(cls_str)
    return f'class="{new_cls}" style="{new_style}"'

html = re.sub(r'class="([^"]+)"', replace_class, html)

html = re.sub(r'style=\{\{\s*([^:]+):\s*`([^`]+)`\s*\}\}', r'style="\1: \2;"', html)
html = html.replace('maskImage:', '-webkit-mask-image:')

def combine_styles(match):
    content = match.group(0)
    styles = re.findall(r'style="([^"]+)"', content)
    merged_style = " ".join(styles)
    content = re.sub(r'\s*style="[^"]*"', '', content)
    if merged_style:
        if content.endswith('/>'):
            content = content[:-2] + f' style="{merged_style}"/>'
        else:
            content = content[:-1] + f' style="{merged_style}">'
    return content

html = re.sub(r'<[^>]+>', combine_styles, html)

# Fix SVG self closing which React allows but HTML parser might complain about if not standard
# Or just let the browser handle it.

# Clean up JSX template string literals and trailing spaces that break centering
html = re.sub(r'\{`([^`]+)`\}', r'\1', html)
html = re.sub(r'\{\s*`([^`]+)`\s*\}', r'\1', html)
# Remove spaces before </p> and <br aria-hidden />
html = re.sub(r'\s+</p>', '</p>', html)
html = re.sub(r'\s+<br', '<br', html)

# Strip trailing spaces from text elements that cause off-center alignment
html = re.sub(r'(\s+)<\/p>', '</p>', html)

# Fix "How it works" text blocks completely to avoid any display:contents or white-space bugs
step1_html = """<div class="" data-node-id="71:958" style="transform: translateX(-50%); position: absolute; font-family: 'Pretendard', sans-serif; left: calc(16.67% + 20.5px); font-size: 20px; top: calc(50% - 192px); letter-spacing: -0.6px; text-align: center; width: 100%; max-width: 600px;">
<p style="margin: 0; line-height: 1.4;">사용하고 싶은 기분과 상황을 선택합니다.<br>사용자는 비누를 사용할 떄 원하는 기분, 날씨, 게절, 분위기에 대한<br>짧은 질문에 답합니다. 질문은 단계별로 제시되며,<br>사용자는 자신이 중요하게 생각하는 기준을<br>단일 선택 또는 복수 선택을 할 수 있습니다.</p>
</div>"""
html = re.sub(r'<div[^>]*data-node-id="71:958"[^>]*>.*?</div>', step1_html, html, flags=re.DOTALL)

step2_html = """<div class="" data-node-id="71:968" style="transform: translateX(-50%); position: absolute; font-family: 'Pretendard', sans-serif; left: calc(50% + 0.5px); font-size: 20px; top: calc(50% + 154px); letter-spacing: -0.6px; text-align: center; width: 100%; max-width: 600px;">
<p style="margin: 0; line-height: 1.4;">BLOOM은 답변을 바탕으로 어울리는 비누를 추천합니다.<br>각 카드는 향, 색, 무드, 게절 키워드를 함께 보여주어<br>제품이 가진 분위기를 한눈에 이해할 수 있도록 돕습니다.</p>
</div>"""
html = re.sub(r'<div[^>]*data-node-id="71:968"[^>]*>.*?</div>', step2_html, html, flags=re.DOTALL)

step3_html = """<div class="" data-node-id="71:978" style="transform: translateX(-50%); position: absolute; font-family: 'Pretendard', sans-serif; left: calc(83.33% - 19.5px); font-size: 20px; top: calc(50% - 69px); letter-spacing: -0.6px; text-align: center; width: 100%; max-width: 600px;">
<p style="margin: 0; line-height: 1.4;">비누에 어울리는 상황과 스토리를 살펴봅니다.<br>마음에 드는 비누 카드를 클릭하면 그 비누의 무드 키워드와 연결된<br>사용 상황, 짧은 스토리, 추천 이유를 확인할 수 있습니다.<br>이를 통해 사용자는 비누를 단순한 세정 제품이 아니라<br>나의 하루와 연결된 감성적인 오브제로 느낄 수 있습니다.</p>
</div>"""
html = re.sub(r'<div[^>]*data-node-id="71:978"[^>]*>.*?</div>', step3_html, html, flags=re.DOTALL)

# Fix whitespace-pre indentation
# Remove newlines immediately following a tag or preceding a tag to avoid extra blank lines
html = re.sub(r'>\s*\n\s*', '>', html)
html = re.sub(r'\s*\n\s*<', '<', html)

final_html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BLOOM</title>
    <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap" rel="stylesheet">
    <style>
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}
        p {{
            margin: 0;
            padding: 0;
        }}
        body {{
            background: #e0e0e0;
            overflow-x: hidden;
        }}
        #scaler {{
            width: 100vw;
            position: relative;
            overflow: hidden;
            display: block;
        }}
        #canvas {{
            width: 1920px;
            height: 6780px;
            position: absolute;
            top: 0;
            background: white;
            overflow: hidden;
        }}
    </style>
</head>
<body>
    <div id="scaler">
        <div id="canvas">
{html}
        </div>
    </div>
    
    <script>
        function updateScale() {{
            const canvas = document.getElementById('canvas');
            const scaler = document.getElementById('scaler');
            const scale = window.innerWidth / 1920;
            
            if(scale < 1) {{
                canvas.style.transform = `scale(${{scale}})`;
                canvas.style.transformOrigin = "top left";
                canvas.style.left = "0";
                scaler.style.height = `${{6780 * scale}}px`;
            }} else {{
                canvas.style.transform = 'scale(1)';
                canvas.style.transformOrigin = "top center";
                canvas.style.left = "50%";
                canvas.style.transform = "translateX(-50%)";
                scaler.style.height = '6780px';
            }}
        }}
        window.addEventListener('resize', updateScale);
        updateScale();
    </script>
"""

js_scroll = ""

final_html += js_scroll + "\n</body>\n</html>"

final_html = final_html.replace('mask-image: url', '-webkit-mask-image: url')
final_html = final_html.replace('-webkit--webkit-mask-image: url', '-webkit-mask-image: url')


# Remove object-fit overrides from Product Problem images (71:929, 71:930, 71:931)
for node_id in ['71:929', '71:930', '71:931']:
    match = re.search(rf'(data-node-id="{node_id}".*?)(object-fit:\s*cover;(\s*object-position:\s*bottom;)*)', final_html)
    if match:
        final_html = final_html[:match.start(2)] + final_html[match.end(2):]

with open(r'c:\Bloom\BLOOM_3.github.io\product.html', 'w', encoding='utf-8') as f:
    f.write(final_html)
print("Generated product.html successfully.")
