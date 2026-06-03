import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# We need to add the click listener for `nextBtn`
old_js = """if (nextBtn) {
            if (anySelected) {
              nextBtn.classList.add('visible');
            } else {
              nextBtn.classList.remove('visible');
            }
          }
        });
      });"""

new_js = """if (nextBtn) {
            if (anySelected) {
              nextBtn.classList.add('visible');
            } else {
              nextBtn.classList.remove('visible');
            }
          }
        });
      });

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          // Hide next button after clicking
          nextBtn.classList.remove('visible');
          
          const b17 = document.querySelector('[data-name="button17"]'); // 기분
          const b16 = document.querySelector('[data-name="button16"]'); // 날씨
          const b15 = document.querySelector('[data-name="button15"]'); // 계절
          
          const cardsToReveal = [];
          if (b17 && b17.classList.contains('selected')) cardsToReveal.push(document.querySelector('[data-name="step2"]'));
          if (b16 && b16.classList.contains('selected')) cardsToReveal.push(document.querySelector('[data-name="step3"]'));
          if (b15 && b15.classList.contains('selected')) cardsToReveal.push(document.querySelector('[data-name="Component 7"]'));
          
          cardsToReveal.forEach((card, i) => {
            if (card) {
              setTimeout(() => {
                card.classList.add('revealed');
              }, i * 300); // 300ms gap between reveals
            }
          });
        });
      }"""

html = html.replace(old_js, new_js)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("JS logic updated.")
