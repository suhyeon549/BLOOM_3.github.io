import re
import os
import urllib.request

with open(r'C:\Users\yeons\.gemini\antigravity-ide\brain\84320f4f-b968-4e9b-acdf-1d73c86364cb\.system_generated\steps\114\output.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

react_code = ""
in_code = False
for raw_line in lines:
    line = raw_line.strip()
    if "export default function TeamPage()" in line:
        in_code = True
    if in_code:
        m = re.match(r'^\d+:\s(.*)', raw_line.rstrip('\n\r'))
        if m:
            react_code += m.group(1) + "\n"
        else:
            react_code += raw_line
    if "199: }" in line or line == "}":
        break

react_code = re.sub(r'export default function TeamPage\(\) \{\s*return \(\s*', '', react_code)
react_code = re.sub(r'\s*\);\s*\}\s*$', '', react_code)

constants = {}
for line in lines:
    m = re.search(r'const\s+(\w+)\s*=\s*"([^"]+)";', line)
    if m:
        constants[m.group(1)] = m.group(2)

html = react_code.replace("className=", "class=")

html = re.sub(r'<div([^>]*?)/>', r'<div\1></div>', html)
html = re.sub(r'<span([^>]*?)/>', r'<span\1></span>', html)
html = re.sub(r'<p([^>]*?)/>', r'<p\1></p>', html)

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
        '-translate-y-1/2': 'transform: translateY(-50%);',
        'whitespace-nowrap': 'white-space: nowrap;',
        'whitespace-pre-wrap': 'white-space: pre-wrap;',
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
        'blur-[15px]': 'filter: blur(15px); -webkit-filter: blur(15px);',
        'rotate-15': 'transform: rotate(15deg);',
        '-rotate-15': 'transform: rotate(-15deg);',
        '-scale-y-100': 'transform: scaleY(-1);',
    }
    
    for cls in classes:
        if cls in mapping:
            styles.append(mapping[cls])
        elif cls == '-translate-x-1/2' and '-translate-y-1/2' in classes:
            pass
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
        elif cls == 'top-1/2':
            styles.append("top: 50%;")
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
                if 'Medium' in val:
                    styles.append("font-weight: 500;")
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
        elif cls.startswith('inset-['):
            val = cls[7:-1].replace('_', ' ')
            styles.append(f"inset: {val};")
        elif cls.startswith('ml-'):
            if cls.startswith('ml-['):
                styles.append(f"margin-left: {cls[4:-1]};")
            else:
                styles.append(f"margin-left: {cls[3:]};")
        elif cls.startswith('mt-'):
            if cls.startswith('mt-['):
                styles.append(f"margin-top: {cls[4:-1]};")
            else:
                styles.append(f"margin-top: {cls[3:]};")
        else:
            new_classes.append(cls)
            
    transforms = []
    if '-translate-x-1/2' in classes: transforms.append('translateX(-50%)')
    if '-translate-y-1/2' in classes: transforms.append('translateY(-50%)')
    if 'rotate-15' in classes: transforms.append('rotate(15deg)')
    if '-rotate-15' in classes: transforms.append('rotate(-15deg)')
    if '-scale-y-100' in classes: transforms.append('scaleY(-1)')
    
    if transforms:
        styles = [s for s in styles if not s.startswith('transform:')]
        styles.append(f"transform: {' '.join(transforms)};")
            
    return ' '.join(new_classes), ' '.join(styles)

def replace_class(match):
    cls_str = match.group(1)
    new_cls, new_style = class_to_style(cls_str)
    return f'class="{new_cls}" style="{new_style}"'

html = re.sub(r'class="([^"]+)"', replace_class, html)

html = re.sub(r'style=\{\{\s*([^:]+):\s*`([^`]+)`\s*\}\}', r'style="\1: \2;"', html)

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

html = re.sub(r'\{`([^`]+)`\}', r'\1', html)
html = re.sub(r'\{\s*`([^`]+)`\s*\}', r'\1', html)
html = re.sub(r'\s+</p>', '</p>', html)
html = re.sub(r'\s+<br', '<br', html)
html = re.sub(r'>\s*\n\s*', '>', html)
html = re.sub(r'\s*\n\s*<', '<', html)

# Replace the menus and logo with the standard header from index.html
# Remove the existing menus:
html = re.sub(r'<p[^>]*data-node-id="124:139"[^>]*>.*?</p>', '', html, flags=re.DOTALL)
html = re.sub(r'<p[^>]*data-node-id="124:140"[^>]*>.*?</p>', '', html, flags=re.DOTALL)
html = re.sub(r'<p[^>]*data-node-id="124:141"[^>]*>.*?</p>', '', html, flags=re.DOTALL)
# Remove the existing logo:
html = re.sub(r'<div[^>]*data-node-id="124:211"[^>]*>.*?</div>', '', html, flags=re.DOTALL)

# Insert the header at the start of Team Page div
header_html = """
                <header style="position: absolute; top: 0; left: 15px; width: 100%; height: 114px; z-index: 1000;">
                    <div class="" data-node-id="71:837" data-name="Group 1 (1) 1"
                        style="position: absolute; height: 74px; left: 40px; top: 20px; width: 135px;"><img alt=""
                            class="" src="assets/8b2a1f19e6af28330d562fc1475d0896e8becd6e.png"
                            style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; max-width: none; object-fit: cover; pointer-events: none; width: 100%; height: 100%;" />
                    </div>
                    <p class="" data-node-id="71:735"
                        style="word-break: break-word; position: absolute; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; line-height: 1; left: 1280px; font-style: normal; color: #1e1e1e; font-size: 20px; top: 47px; white-space: nowrap; cursor: pointer;"
                        onclick="window.location.href='index.html';">
                        ABOUT</p>
                    <p class="" data-node-id="71:736"
                        style="word-break: break-word; position: absolute; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; line-height: 1; left: 1435px; font-style: normal; color: #1e1e1e; font-size: 20px; top: 47px; white-space: nowrap; cursor: pointer;"
                        onclick="window.location.href='Team.html';">
                        TEAM</p>
                    <p class="" data-node-id="71:737"
                        style="word-break: break-word; position: absolute; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; line-height: 1; left: 1590px; font-style: normal; color: #1e1e1e; font-size: 20px; top: 47px; white-space: nowrap; cursor: pointer;"
                        onclick="window.location.href='product.html';">PRODUCTS</p>
                </header>
"""
html = html.replace('<div class="" data-node-id="124:60"', f'<div class="" data-node-id="124:60" \n{header_html}')

# Add link to footer PRODUCTS text (data-node-id="124:209")
html = re.sub(
    r'(<p[^>]*data-node-id="124:209"[^>]*style="[^"]*)(")',
    r'\1 cursor: pointer;" onclick="window.location.href=\'product.html\';"',
    html
)
# Add link to footer TEAM text (data-node-id="124:208")
html = re.sub(
    r'(<p[^>]*data-node-id="124:208"[^>]*style="[^"]*)(")',
    r'\1 cursor: pointer;" onclick="window.location.href=\'Team.html\';"',
    html
)
# Add link to footer ABOUT text (data-node-id="124:207")
html = re.sub(
    r'(<p[^>]*data-node-id="124:207"[^>]*style="[^"]*)(")',
    r'\1 cursor: pointer;" onclick="window.location.href=\'index.html\';"',
    html
)

final_html = f'''<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BLOOM - Team</title>
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
            height: 3660px;
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
                scaler.style.height = `${{3660 * scale}}px`;
            }} else {{
                canvas.style.transform = 'scale(1)';
                canvas.style.transformOrigin = "top center";
                canvas.style.left = "50%";
                canvas.style.transform = "translateX(-50%)";
                scaler.style.height = '3660px';
            }}
        }}
        window.addEventListener('resize', updateScale);
        updateScale();
    </script>
</body>
</html>
'''

with open(r'c:\Bloom\BLOOM_3.github.io\Team.html', 'w', encoding='utf-8') as f:
    f.write(final_html)
print("Generated Team.html successfully.")
