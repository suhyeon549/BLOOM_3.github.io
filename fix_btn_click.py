import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_js = """const btns = document.querySelectorAll('#curation-question-card .curation-btn');
      const nextBtn = document.getElementById('curation-next-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btn.classList.toggle('selected');
          
          let anySelected = false;
          btns.forEach(b => {
            if (b.classList.contains('selected')) anySelected = true;
          });
          
          if (nextBtn) {
            if (anySelected) {
              nextBtn.classList.add('visible');
            } else {
              nextBtn.classList.remove('visible');
            }
          }
        });
      });"""

new_js = """const allBtns = document.querySelectorAll('.curation-btn');
      allBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          btn.classList.toggle('selected');
        });
      });
      
      const questionBtns = document.querySelectorAll('#curation-question-card .curation-btn');
      const nextBtn = document.getElementById('curation-next-btn');
      questionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          let anySelected = false;
          questionBtns.forEach(b => {
            if (b.classList.contains('selected')) anySelected = true;
          });
          
          if (nextBtn) {
            if (anySelected) {
              nextBtn.classList.add('visible');
            } else {
              nextBtn.classList.remove('visible');
            }
          }
        });
      });"""

html = html.replace(old_js, new_js)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("JS logic updated for all buttons.")
