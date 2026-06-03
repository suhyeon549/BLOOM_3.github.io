from html.parser import HTMLParser

class MyParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.section5_depth = -1
        
        self.arrow_in_sec5 = False
        self.phase2_in_sec5 = False
        self.cards_in_sec5 = False
        
    def handle_starttag(self, tag, attrs):
        self.stack.append(tag)
        attrs_dict = dict(attrs)
        
        if attrs_dict.get('data-name') == '5. Product-Use Case':
            self.section5_depth = len(self.stack)
            
        if attrs_dict.get('id') == 'curation-arrow':
            if self.section5_depth != -1:
                self.arrow_in_sec5 = True
                
        if attrs_dict.get('id') == 'curation-result-container':
            if self.section5_depth != -1:
                self.phase2_in_sec5 = True
                
        if attrs_dict.get('id') == 'curation-cards-container':
            if self.section5_depth != -1:
                self.cards_in_sec5 = True

    def handle_endtag(self, tag):
        if len(self.stack) == self.section5_depth:
            self.section5_depth = -1
        if self.stack:
            self.stack.pop()

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

parser = MyParser()
parser.feed(html)
print('Arrow in sec5:', parser.arrow_in_sec5)
print('Phase 2 in sec5:', parser.phase2_in_sec5)
print('Cards in sec5:', parser.cards_in_sec5)
