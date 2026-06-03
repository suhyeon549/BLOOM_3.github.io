import re

with open("c:/Bloom/BLOOM_3.github.io/product.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

# We want to replace lines 1999 to 2052
# Let's find exactly the line indices for `} else if (index === 3) {` and `    }`
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if "} else if (index === 3) {" in line:
        start_idx = i
        break

if start_idx != -1:
    # Find the end of triggerSectionAnimations function
    for i in range(start_idx, len(lines)):
        if "  </script>" in lines[i]:
            # The closing brace for triggerSectionAnimations should be the line before </script>
            end_idx = i - 1
            break

if start_idx != -1 and end_idx != -1:
    correct_logic = """      } else if (index === 3) {
        const t1 = document.querySelector('.feat-title-1');
        const t2 = document.querySelector('.feat-title-2');
        const t3 = document.querySelector('.feat-title-3');
        const st1 = document.querySelector('.feat-step-1');
        const st2 = document.querySelector('.feat-step-2');
        const st3 = document.querySelector('.feat-step-3');
        const st4 = document.querySelector('.feat-step-4');

        if (t1) setTimeout(() => t1.classList.add('visible'), 500);
        if (t2) setTimeout(() => t2.classList.add('visible'), 700);
        if (t3) setTimeout(() => t3.classList.add('visible'), 900);

        if (st1) setTimeout(() => st1.classList.add('visible'), 1200);
        if (st2) setTimeout(() => st2.classList.add('visible'), 1400);
        if (st3) setTimeout(() => st3.classList.add('visible'), 1600);
        if (st4) setTimeout(() => st4.classList.add('visible'), 1800);
      } else if (index === 4) {
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
      }
    }
"""
    lines[start_idx:end_idx + 1] = [correct_logic]
    
    with open("c:/Bloom/BLOOM_3.github.io/product.html", "w", encoding="utf-8") as f:
        f.writelines(lines)
    print("Fixed triggerSectionAnimations logic")
else:
    print("Could not find start_idx or end_idx")
