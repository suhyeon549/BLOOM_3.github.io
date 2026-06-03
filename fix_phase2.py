import re

# Update interactions.css
with open('c:/Bloom/BLOOM_3.github.io/interactions.css', 'r', encoding='utf-8') as f:
    css = f.read()

if 'blurSemiRevealStrong' not in css:
    new_css = """
    .reveal-semi-blur-strong {
      animation: blurSemiRevealStrong 1.5s ease-out forwards;
    }

    @keyframes blurSemiRevealStrong {
      0% {
        opacity: 0;
        transform: translateY(40px);
        filter: blur(24px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
        filter: blur(10px);
      }
    }

    .phrase-line {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .phrase-line.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    """
    css += new_css
    with open('c:/Bloom/BLOOM_3.github.io/interactions.css', 'w', encoding='utf-8') as f:
        f.write(css)

# Update product.html script
with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_js = """            // Wait for animation to finish, then proceed to phase 2
            setTimeout(() => {
              // Group 68, 69, 70 logic will go here
              console.log("Cards slided out. Ready for phase 2.");
            }, 800);"""

new_js = """            // Wait for animation to finish, then proceed to phase 2
            setTimeout(() => {
              console.log("Cards slided out. Ready for phase 2.");
              
              // Reveal result cards (Group 68, 69, 70 equivalent)
              const card1 = document.getElementById('curation-result-card-1');
              const card2 = document.getElementById('curation-result-card-2');
              const card3 = document.getElementById('curation-result-card-3');
              
              if (card1) card1.classList.add('reveal-semi-blur-strong');
              if (card2) setTimeout(() => card2.classList.add('reveal-semi-blur-strong'), 300);
              if (card3) setTimeout(() => card3.classList.add('reveal-semi-blur-strong'), 600);
              
              // 600ms (start of card 3) + 1500ms (anim duration) + 500ms (wait 0.5s) = 2600ms
              setTimeout(() => {
                const phraseContainer = document.getElementById('curation-phrase');
                if (phraseContainer) phraseContainer.style.opacity = '1';
                
                const phraseLines = document.querySelectorAll('.phrase-line');
                if (phraseLines.length > 0) {
                    phraseLines[0].classList.add('revealed');
                }
                if (phraseLines.length > 1) {
                    setTimeout(() => phraseLines[1].classList.add('revealed'), 400);
                }
              }, 2600);
              
            }, 800);"""

html = html.replace(old_js, new_js)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated Show Result logic and animations.")
