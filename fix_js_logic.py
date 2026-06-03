import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_js_pattern = re.compile(r"const allBtns = document\.querySelectorAll\('\.curation-btn'\);.*?}\n    }\);\n  </script>", re.DOTALL)

new_js = """let questionLocked = false;
      let revealedCards = [];

      // 1. Question card buttons logic
      const questionBtns = document.querySelectorAll('#curation-question-card .curation-btn');
      const nextBtn = document.getElementById('curation-next-btn');
      
      questionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (questionLocked) return; // Requirement 3: Lock after next click
          
          btn.classList.toggle('selected');
          
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
      });

      // 2. Paired cards exclusive selection logic
      const pairedCards = [
        document.querySelector('[data-name="step2"]'),
        document.querySelector('[data-name="step3"]'),
        document.querySelector('[data-name="Component 7"]')
      ];

      pairedCards.forEach(card => {
        if (!card) return;
        const btnsInCard = card.querySelectorAll('.curation-btn');
        btnsInCard.forEach(btn => {
          btn.addEventListener('click', () => {
            // Exclusive selection (Requirement 1)
            btnsInCard.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Check if all revealed cards have at least one selection (Requirement 2)
            if (revealedCards.length > 0) {
              let allSatisfied = true;
              revealedCards.forEach(rCard => {
                const rBtns = rCard.querySelectorAll('.curation-btn');
                let cardHasSelection = false;
                rBtns.forEach(rb => {
                  if (rb.classList.contains('selected')) cardHasSelection = true;
                });
                if (!cardHasSelection) allSatisfied = false;
              });

              if (allSatisfied && nextBtn) {
                // To indicate it's for the final result, we can just show the same next button
                nextBtn.classList.add('visible');
                // We'll also change its text to indicate completion
                nextBtn.innerText = "Show Result"; 
              }
            }
          });
        });
      });

      // 3. Next Button click logic
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (!questionLocked) {
            // First time clicking Next (from Question Card)
            questionLocked = true; // Lock question buttons
            nextBtn.classList.remove('visible'); // Hide it
            
            const b17 = document.querySelector('[data-name="button17"]'); // 기분
            const b16 = document.querySelector('[data-name="button16"]'); // 날씨
            const b15 = document.querySelector('[data-name="button15"]'); // 계절
            
            if (b17 && b17.classList.contains('selected')) revealedCards.push(document.querySelector('[data-name="step2"]'));
            if (b16 && b16.classList.contains('selected')) revealedCards.push(document.querySelector('[data-name="step3"]'));
            if (b15 && b15.classList.contains('selected')) revealedCards.push(document.querySelector('[data-name="Component 7"]'));
            
            revealedCards.forEach((card, i) => {
              if (card) {
                setTimeout(() => {
                  card.classList.add('revealed');
                }, i * 300); // 300ms gap between reveals
              }
            });
          } else {
            // Second time clicking Next (Show Result)
            // The user hasn't asked to implement the actual result transition yet, 
            // but we can prepare the click handler.
            console.log("Move to result!");
          }
        });
      }
    });
  </script>"""

if old_js_pattern.search(html):
    html = old_js_pattern.sub(new_js, html)
    with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("JS logic completely updated.")
else:
    print("Could not find the JS block to replace.")
