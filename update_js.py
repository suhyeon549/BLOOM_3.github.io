import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update triggerSectionAnimations for index === 4
old_trigger = """} else if (index === 4) {
        isCurationArrowRevealed = false;
        isCurationCardsHidden = false;
        isCurationPhase2Revealed = false;
        const arrow = document.getElementById('curation-arrow');
        if (arrow) {
          arrow.classList.remove('visible', 'fade-out');
        }
        const cards = document.getElementById('curation-cards-container');
        if (cards) {
          cards.classList.remove('slide-out-left');
        }
        const resultContainer = document.getElementById('curation-result-container');
        if (resultContainer) resultContainer.style.display = 'none';
        const arrow2 = document.getElementById('curation-arrow-2');
        if (arrow2) {
          arrow2.style.opacity = '0';
          arrow2.style.transform = 'translateX(-100px)';
        }
        const resultCards = [
          document.getElementById('curation-result-card-1'),
          document.getElementById('curation-result-card-2'),
          document.getElementById('curation-result-card-3')
        ];
        resultCards.forEach(card => {
          if (card) card.classList.remove('reveal-semi-blur');
        });
        const phrases = document.querySelectorAll('.phrase-line');
        phrases.forEach(phrase => phrase.classList.remove('visible'));
      }"""

new_trigger = """} else if (index === 4) {
        // Sequential appearance of texts and question card
        setTimeout(() => {
          const t1 = document.getElementById('curation-text-1');
          if (t1) t1.classList.add('visible');
        }, 100);
        setTimeout(() => {
          const t2 = document.getElementById('curation-text-2');
          if (t2) t2.classList.add('visible');
        }, 600);
        setTimeout(() => {
          const qc = document.getElementById('curation-question-card');
          if (qc) qc.classList.add('visible');
        }, 1100);
      }"""

html = html.replace(old_trigger, new_trigger)

# 2. Update handleGlobalScroll logic
old_scroll = """// Curation section intercept
        if (activeSectionIndex === 4) {
          if (!isCurationArrowRevealed) {
            if (globalScrollAccumulator > 30) {
              isCurationArrowRevealed = true; // Mark as started
              const arrow = document.getElementById('curation-arrow');
              if (arrow) arrow.classList.add('visible');

              // Sequence: Wait 1 second (for arrow animation to finish), then slide out cards and fade out arrow
              setTimeout(() => {
                const cards = document.getElementById('curation-cards-container');
                if (cards) cards.classList.add('slide-out-left');
                if (arrow) {
                  arrow.classList.remove('visible');
                  arrow.classList.add('fade-out');
                }
                isCurationCardsHidden = true;
              }, 1000);

              globalScrollAccumulator = 0;
            }
            return;
          } else if (!isCurationCardsHidden) {
            // Still animating, consume scroll
            globalScrollAccumulator = 0;
            return;
          } else if (isCurationCardsHidden && !isCurationPhase2Revealed) {
            if (globalScrollAccumulator > 30) {
              isCurationPhase2Revealed = true;
              isGlobalTransitioning = true;
              
              const resultContainer = document.getElementById('curation-result-container');
              if (resultContainer) resultContainer.style.display = 'block';

              setTimeout(() => {
                const arrow2 = document.getElementById('curation-arrow-2');
                if (arrow2) {
                  arrow2.style.opacity = '1';
                  arrow2.style.transform = 'translateX(0)';
                }
              }, 50);

              const cards = [
                document.getElementById('curation-result-card-1'),
                document.getElementById('curation-result-card-2'),
                document.getElementById('curation-result-card-3')
              ];

              cards.forEach((card, i) => {
                if (card) {
                  setTimeout(() => {
                    card.classList.add('reveal-semi-blur');
                  }, 1000 + i * 300);
                }
              });

              setTimeout(() => {
                const phrases = document.querySelectorAll('.phrase-line');
                phrases.forEach((phrase, i) => {
                  setTimeout(() => {
                    phrase.classList.add('visible');
                  }, i * 300);
                });
              }, 1000 + cards.length * 300 + 200);

              setTimeout(() => {
                isGlobalTransitioning = false;
                globalScrollAccumulator = 0;
              }, 1000 + cards.length * 300 + 1000);
            }
            return;
          } else if (isCurationPhase2Revealed) {
            // allow moving to next section
          }
        }"""

new_scroll = """// Curation section intercept removed as it's now click-based."""

html = html.replace(old_scroll, new_scroll)

# 3. Update the button toggle logic
old_btn_logic = """const btns = document.querySelectorAll('.curation-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btn.classList.toggle('selected');
        });
      });"""

new_btn_logic = """const btns = document.querySelectorAll('#curation-question-card .curation-btn');
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

html = html.replace(old_btn_logic, new_btn_logic)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("JS updated successfully.")
