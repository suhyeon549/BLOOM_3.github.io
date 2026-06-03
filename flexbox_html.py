import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update curation-cards-container
container_pattern = r'(<div data-node-id="227:219" id="curation-cards-container" data-name="curation-cards-1"[^>]*style=")([^"]*)(")'
def repl_container(m):
    # keep absolute positioning for the container, but add flex
    return m.group(1) + 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 10; display: flex; justify-content: center; align-items: flex-start; padding-top: 459px; gap: 18px;' + m.group(3)
html = re.sub(container_pattern, repl_container, html)

# 2. Update the individual cards: Component 4, step2, step3, Component 7
# We need to change their `position: absolute` to `position: relative`
# Remove `left`, `top`. Keep `width`, `height`.
# Also add `.curation-card-wrapper` class to step2, step3, Component 7 for the width transition.
# Component 4 doesn't need width transition since it's already visible.

def modify_card(name, is_initial=False):
    global html
    # Find the tag
    pattern = re.compile(f'(<div data-node-id="[^"]+" data-name="{name}"(?: class="[^"]*")?)([^>]*style=")([^"]*)(")')
    
    match = pattern.search(html)
    if not match:
        return
        
    style = match.group(3)
    # Remove position, left, top
    style = re.sub(r'position:\s*absolute;', 'position: relative;', style)
    style = re.sub(r'left:\s*[^;]+;', '', style)
    style = re.sub(r'top:\s*[^;]+;', '', style)
    
    # We want to add classes.
    prefix = match.group(1)
    
    # If the card already has a class attribute, we add to it. Otherwise, we add a class attribute.
    if is_initial:
        # Component 4 already has class="curation-text-anim" from my previous edit.
        pass
    else:
        # For step2, step3, Component 7, I previously added `display: none;`
        # Now I will remove display none and instead they will be controlled by CSS class `curation-dynamic-card`
        style = re.sub(r'display:\s*none;', '', style)
        if 'class="' in prefix:
            prefix = prefix.replace('class="', 'class="curation-dynamic-card ')
        else:
            prefix += ' class="curation-dynamic-card"'
            
    html = html[:match.start()] + prefix + match.group(2) + style + match.group(4) + html[match.end():]

modify_card('Component 4', True)
modify_card('step2', False)
modify_card('step3', False)
modify_card('Component 7', False)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("HTML modified for flexbox.")
