from html.parser import HTMLParser

class FindEnd(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.target_depth = -1
        self.end_pos = -1

    def handle_starttag(self, tag, attrs):
        self.stack.append(tag)
        attrs_dict = dict(attrs)
        if attrs_dict.get('id') == 'curation-cards-container':
            self.target_depth = len(self.stack)

    def handle_endtag(self, tag):
        if len(self.stack) == self.target_depth:
            self.end_pos = self.getpos()
            self.target_depth = -1
        if self.stack:
            self.stack.pop()

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

p = FindEnd()
p.feed(html)
print("End pos line:", p.end_pos)

lines = html.split('\n')
if p.end_pos != -1:
    line = p.end_pos[0] - 1
    # Count characters up to that line
    char_count = sum(len(l) + 1 for l in lines[:line]) + p.end_pos[1]
    print("End char index:", char_count)
