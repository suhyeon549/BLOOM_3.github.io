import re

with open("c:/Bloom/BLOOM_3.github.io/product.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add id to curation-cards-1
content = content.replace('data-name="curation-cards-1"', 'id="curation-cards-container" data-name="curation-cards-1"')

# 2. Add curation-arrow just after curation-cards-container div closes, but wait, curation-cards-container is a parent.
# Let's just put curation-arrow inside data-name="5. Product-Curation"
# I can put it right before `Curation Preview` or right after curation-cards-container.
arrow_html = """
          <div id="curation-arrow" class="curation-arrow" style="position: absolute; height: 6px; left: 1703px; top: 681px; width: 266px;">
            <img alt="" src="assets/arrow1.png" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; max-width: none; object-fit: cover; pointer-events: none; width: 100%; height: 100%;" />
          </div>
"""
# Find closing tag of curation-cards-container. 
# Or easier: find `Curation Preview` p tag and insert after it, which is inside curation-cards-container. 
# Wait, the figma has arrow 1 outside of curation-cards-1 in the root of Frame.
# Let's insert before the closing div of "5. Product-Curation".
# Wait, the end of 5. Product-Curation:
#           </div>
#         </div>
#         <div class="" data-node-id="71:1014" data-name="4. Product - Key Features" 
insertion_point = '<div class="" data-node-id="71:1014" data-name="4. Product - Key Features"'
content = content.replace(insertion_point, arrow_html + '        </div>\n        ' + insertion_point)

# 3. Add CSS for animations
css = """
    .curation-arrow {
      opacity: 0;
      transform: translateX(-50px);
      transition: opacity 1s ease-out, transform 1s ease-out;
    }
    .curation-arrow.visible {
      opacity: 1;
      transform: translateX(0);
    }
    .curation-arrow.fade-out {
      opacity: 0;
      transition: opacity 0.5s ease-out;
    }
    #curation-cards-container {
      transition: transform 1s ease-out, opacity 1s ease-out;
    }
    #curation-cards-container.slide-out-left {
      transform: translateX(-100px);
      opacity: 0;
    }
"""
content = content.replace('</style>', css + '</style>')

# 4. Add JS variables
js_vars = """
    let isCurationArrowRevealed = false;
    let isCurationCardsHidden = false;
"""
content = content.replace('let isTypewriterFinished = false;', js_vars + '    let isTypewriterFinished = false;')

# 5. Intercept in handleGlobalScroll for scroll down
intercept_down = """
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
# insert inside `if (globalScrollAccumulator > 0) {`
# just before `// Typewriter intercept`
content = content.replace('// Typewriter intercept\n        if (activeSectionIndex === 1 && !isTypewriterFinished && section1EnterDirection === \'down\') {', intercept_down + '\n        // Typewriter intercept\n        if (activeSectionIndex === 1 && !isTypewriterFinished && section1EnterDirection === \'down\') {')

# 6. Reset in triggerSectionAnimations
reset_logic = """
      } else if (index === 4) {
        isCurationArrowRevealed = false;
        isCurationCardsHidden = false;
        const arrow = document.getElementById('curation-arrow');
        if (arrow) {
          arrow.classList.remove('visible', 'fade-out');
        }
        const cards = document.getElementById('curation-cards-container');
        if (cards) {
          cards.classList.remove('slide-out-left');
        }
      }
"""
# insert inside triggerSectionAnimations at the end of the if-else chain.
# Currently it ends with:
#         if (st3) setTimeout(() => st3.classList.add('visible'), 1600);
#         if (st4) setTimeout(() => st4.classList.add('visible'), 1800);
#       }
#     }
# Wait, let's just append to `if (st4) setTimeout(() => st4.classList.add('visible'), 1800);\n      }`
content = content.replace("if (st4) setTimeout(() => st4.classList.add('visible'), 1800);\n      }", "if (st4) setTimeout(() => st4.classList.add('visible'), 1800);\n      }" + reset_logic)


with open("c:/Bloom/BLOOM_3.github.io/product.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
