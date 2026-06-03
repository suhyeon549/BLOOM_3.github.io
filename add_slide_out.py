import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add CSS for slide-out
css_inject = """
  <style>
    #curation-cards-container {
      transition: transform 0.8s ease-out, opacity 0.8s ease-out;
    }
    #curation-cards-container.slide-out-left {
      transform: translateX(-50px) !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  </style>
</head>
"""
html = html.replace('</head>', css_inject)

# Update JS logic for Show Result
old_js = """
          } else {
            // Second time clicking Next (Show Result)
            // The user hasn't asked to implement the actual result transition yet, 
            // but we can prepare the click handler.
            console.log("Move to result!");
          }
"""

new_js = """
          } else {
            // Second time clicking Next (Show Result)
            console.log("Show Result Clicked!");
            
            // 1. Hide the Next button itself
            nextBtn.style.opacity = '0';
            nextBtn.style.pointerEvents = 'none';

            // 2. Slide out the cards
            const cardsContainer = document.getElementById('curation-cards-container');
            if (cardsContainer) {
              cardsContainer.classList.add('slide-out-left');
            }
            
            // Wait for animation to finish, then proceed to phase 2
            setTimeout(() => {
              // Group 68, 69, 70 logic will go here
              console.log("Cards slided out. Ready for phase 2.");
            }, 800);
          }
"""
html = html.replace(old_js, new_js)

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Added slide-out logic.")
