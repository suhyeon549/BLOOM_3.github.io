import re

with open("c:/Bloom/BLOOM_3.github.io/product.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the current intercept block with the time sequence one
old_intercept = """
        // Curation section intercept
        if (activeSectionIndex === 4) {
          if (!isCurationArrowRevealed) {
            if (globalScrollAccumulator > 30) {
              const arrow = document.getElementById('curation-arrow');
              if (arrow) arrow.classList.add('visible');
              isCurationArrowRevealed = true;
              globalScrollAccumulator = 0;
            }
            return;
          } else if (!isCurationCardsHidden) {
            if (globalScrollAccumulator > 30) {
              const cards = document.getElementById('curation-cards-container');
              if (cards) cards.classList.add('slide-out-left');
              const arrow = document.getElementById('curation-arrow');
              if (arrow) {
                arrow.classList.remove('visible');
                arrow.classList.add('fade-out');
              }
              isCurationCardsHidden = true;
              globalScrollAccumulator = 0;
            }
            return;
          }
        }
"""

new_intercept = """
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

if old_intercept.strip() in content:
    content = content.replace(old_intercept.strip(), new_intercept.strip())
else:
    # Use regex to find it loosely
    content = re.sub(r'// Curation section intercept.*?return;\s*}\s*}\s*}', new_intercept.strip(), content, flags=re.DOTALL)

with open("c:/Bloom/BLOOM_3.github.io/product.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
