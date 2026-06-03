import re
import os
import urllib.request

with open(r'C:\Users\yeons\.gemini\antigravity-ide\brain\d2faa7e3-2187-40ef-8f28-36ed867ded33\.system_generated\steps\175\output.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

react_code = ""
in_code = False
for raw_line in lines:
    line = raw_line.strip()
    if "export default function MainPage()" in line:
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
react_code = re.sub(r'export default function MainPage\(\) \{\s*return \(\s*', '', react_code)
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
            height: 6900px;
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
                scaler.style.height = `${{6900 * scale}}px`;
            }} else {{
                canvas.style.transform = 'scale(1)';
                canvas.style.transformOrigin = "top center";
                canvas.style.left = "50%";
                canvas.style.transform = "translateX(-50%)";
                scaler.style.height = '6900px';
            }}
        }}
        window.addEventListener('resize', updateScale);
        updateScale();
    </script>
"""

js_scroll = """
    <script>
        let currentStep = 0; // 0, 1, 2
        let isAnimating = false;
        
        const step1 = document.querySelector('[data-name="5. Main-How it works-step1"]');
        const step2 = document.querySelector('[data-name="5. Main-How it works-step2"]');
        const step3 = document.querySelector('[data-name="5. Main-How it works-step3"]');
        
        const s1Left = 0;
        const s2Left = 1920 + 260; // 2180
        const s3Left = 1920 + 2440; // 4360
        
        [step1, step2, step3].forEach(el => {
            if(el) {
                el.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            }
        });
        
        window.addEventListener('wheel', (e) => {
            if (!step1) return;
            const canvas = document.getElementById('canvas');
            const scale = window.innerWidth < 1920 ? window.innerWidth / 1920 : 1;
            
            const rect = step1.getBoundingClientRect();
            const threshold = 50;
            
            if (Math.abs(rect.top) < threshold) {
                if (e.deltaY > 0) {
                    if (currentStep < 2) {
                        e.preventDefault();
                        if (isAnimating) return;
                        isAnimating = true;
                        currentStep++;
                        updateSteps();
                        setTimeout(() => isAnimating = false, 700);
                    }
                } 
                else if (e.deltaY < 0) {
                    if (currentStep > 0) {
                        e.preventDefault();
                        if (isAnimating) return;
                        isAnimating = true;
                        currentStep--;
                        updateSteps();
                        setTimeout(() => isAnimating = false, 700);
                    }
                }
            } else if (rect.top < 0 && e.deltaY < 0 && currentStep > 0) {
                 window.scrollTo({
                     top: step1.offsetTop * scale,
                     behavior: 'smooth'
                 });
            }
        }, { passive: false });
        
        function updateSteps() {
            let offset = 0;
            if(currentStep === 1) offset = -s2Left;
            if(currentStep === 2) offset = -s3Left;
            
            [step1, step2, step3].forEach(el => {
                if(el) {
                    el.style.transform = `translateX(${offset}px)`;
                }
            });
        }
    </script>
"""

final_html += js_scroll + "\n</body>\n</html>"

final_html = final_html.replace('mask-image: url', '-webkit-mask-image: url')
final_html = final_html.replace('-webkit--webkit-mask-image: url', '-webkit-mask-image: url')

# Adjust positions by -150px as requested by user
overrides = {
    '71:729': 450,
    '71:738': 530,
    '71:739': 770,
    '71:741': 770
}
for node_id, new_top in overrides.items():
    final_html = re.sub(
        rf'(data-node-id="{node_id}"[^>]*style="[^"]*top:\s*)[0-9]+px',
        rf'\g<1>{new_top}px',
        final_html
    )

# Fix 71:798 image proportions
# The React export added object-fit: cover and object-position: bottom, which crops the image incorrectly.
# Removing these makes it fill the container properly.
match_71798 = re.search(r'(data-node-id="71:798".*?)(object-fit:\s*cover;\s*object-position:\s*bottom;)', final_html)
if match_71798:
    final_html = final_html[:match_71798.start(2)] + final_html[match_71798.end(2):]

# Fix CTA Mask Group 84:101 coordinates and masking
mask_group_match = re.search(r'<div[^>]*data-node-id="84:101"[^>]*>.*?(?=</div>\s*</div>\s*</div>)', final_html, re.DOTALL)
if mask_group_match:
    fixed_mask_group = '''<div class="" data-node-id="84:101" data-name="Mask group" style="position: absolute; left: 40px; top: 371px; width: 950px; height: 477px; overflow: hidden; border-radius: 0px;">
  <img alt="" class="" src="assets/0f0586de20af1370591b4ab488e912168c1ae532.png" style="position: absolute; left: 4px; top: -752px; width: 941px; height: 1672px; pointer-events: none;"/>
'''
    final_html = final_html[:mask_group_match.start()] + fixed_mask_group + final_html[mask_group_match.end():]

# Insert the newly attached image into step2
step2_img_html = r'<div class="" data-name="step2-bg" style="position: absolute; height: 1080px; left: 0; top: 0; width: 960px;"><img alt="" class="" src="assets/step2_bg.jpg" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; max-width: none; object-fit: cover; pointer-events: none; width: 100%; height: 100%;"/></div>'
step2_start = r'(<div[^>]*data-name="5\. Main-How it works-step2"[^>]*>)'
final_html = re.sub(step2_start, rf'\1{step2_img_html}', final_html)

# Add hyperlink to PRODUCTS button (71:737)
final_html = re.sub(
    r'(<p[^>]*data-node-id="71:737"[^>]*style=")([^"]*)(")',
    r'\1\2 cursor: pointer;" onclick="window.location.href=\'product.html\';\3',
    final_html
)

with open(r'c:\Bloom\BLOOM_3.github.io\index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)
print("Generated index.html successfully.")
