import re

with open("c:/Bloom/BLOOM_3.github.io/product.html", "r", encoding="utf-8") as f:
    content = f.read()

old_logic = """
        // Curation section intercept
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
          }
        }
"""

new_logic = """
        // Curation section intercept
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
              
              // Show Phase 2 container
              const resultContainer = document.getElementById('curation-result-container');
              if (resultContainer) resultContainer.style.display = 'block';

              const arrow2 = document.getElementById('curation-arrow-2');
              const cards = [
                document.getElementById('curation-result-card-1'),
                document.getElementById('curation-result-card-2'),
                document.getElementById('curation-result-card-3')
              ];
              const phrases = document.querySelectorAll('.phrase-line');

              // 1. Arrow 2 appears
              if (arrow2) {
                arrow2.style.opacity = '1';
                arrow2.style.transform = 'translateX(0)';
              }

              // 2. Cards appear sequentially after 1s
              setTimeout(() => {
                cards.forEach((card, i) => {
                  if (card) {
                    setTimeout(() => {
                      card.classList.add('reveal-semi-blur');
                    }, i * 300);
                  }
                });

                // 3. Phrases appear after cards
                setTimeout(() => {
                  phrases.forEach((phrase, i) => {
                    setTimeout(() => {
                      phrase.classList.add('visible');
                    }, i * 400);
                  });
                  
                  setTimeout(() => {
                    isGlobalTransitioning = false;
                  }, 1000); // 1s buffer after phrase appears
                }, 1200); // Wait for cards
              }, 1000); // Wait for arrow

              globalScrollAccumulator = 0;
            }
            return;
          } else if (isCurationPhase2Revealed && isGlobalTransitioning) {
            globalScrollAccumulator = 0;
            return;
          }
        }
"""

if old_logic.strip() in content:
    content = content.replace(old_logic.strip(), new_logic.strip())
else:
    # Let's do a more robust regex replacement
    pattern = re.compile(r'// Curation section intercept\s*if \(activeSectionIndex === 4\) \{[\s\S]*?\} else if \(\!isCurationCardsHidden\) \{[\s\S]*?return;\s*\}\s*\}')
    content = pattern.sub(new_logic.strip(), content)

with open("c:/Bloom/BLOOM_3.github.io/product.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
