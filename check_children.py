from html.parser import HTMLParser

class ChildParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_sec5 = False
        self.depth = 0
        self.children = []
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if attrs_dict.get('data-name') == '5. Product-Use Case':
            self.in_sec5 = True
            self.depth = 1
        elif self.in_sec5:
            if self.depth == 1:
                self.children.append({'tag': tag, 'attrs': attrs_dict})
            self.depth += 1
    def handle_endtag(self, tag):
        if self.in_sec5:
            self.depth -= 1
            if self.depth == 0:
                self.in_sec5 = False

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

p = ChildParser()
p.feed(html)
for i, c in enumerate(p.children):
    style = c['attrs'].get('style', '')
    style_short = style[:30] if style else ''
    print(f"{i}: {c['tag']} id={c['attrs'].get('id')} name={c['attrs'].get('data-name')} style={style_short}")
