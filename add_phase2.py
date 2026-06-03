import re

with open("c:/Bloom/BLOOM_3.github.io/product.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add CSS for semi-blur
css_to_add = """
    .reveal-semi-blur {
      animation: blurSemiReveal 1.5s ease-out forwards;
    }

    @keyframes blurSemiReveal {
      0% {
        opacity: 0;
        filter: blur(24px);
        transform: translateY(40px);
      }
      100% {
        opacity: 1;
        filter: blur(4px);
        transform: translateY(0);
      }
    }

    .phrase-line {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 1s ease, transform 1s ease;
    }
    .phrase-line.visible {
      opacity: 1;
      transform: translateY(0);
    }
"""

content = content.replace("</style>", css_to_add + "</style>")

# 2. Add HTML for Component 4, 5, 6, arrow 2, phrase
html_to_add = """
          <!-- Curation Result Phase 2 -->
          <div id="curation-result-container" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; z-index: 20; display: none;">
            <img id="curation-arrow-2" src="assets/arrow1.png" style="position: absolute; left: 0; top: 681px; width: 266px; height: 6px; opacity: 0; transform: translateX(-100px); transition: opacity 1s ease, transform 1s ease;">

            <div class="curation-result-card" id="curation-result-card-1" style="position: absolute; left: 262px; top: 400px; width: 450px; height: 549px; background: white; border-radius: 20px; opacity: 0; filter: blur(24px); transform: translateY(40px);">
              <div style="width: 100%; height: 294px; background: #e0e0e0; border-radius: 20px 20px 0 0;"></div>
              <div style="padding: 25px 20px;">
                <h3 style="font-size: 32px; font-weight: bold; margin-bottom: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e1e1e;">Rainy Bloom Soap</h3>
                <p style="font-size: 14px; font-weight: 500; color: #666; margin-bottom: 20px; font-family: 'Pretendard', sans-serif;">#워터리 플로럴 #비 오는 날 #기분이 가라앉을 때, 환기가 필요할 때 #비 오는 날 #봄</p>
                <p style="font-size: 16px; line-height: 1.6; font-family: 'Pretendard', sans-serif; color: #1e1e1e;">비가 조용히 내리는 오후, 무겁게 가라앉은 기분을 급하게 끌어올리기보다 천천히 환기하고 싶을 때 어울리는 비누입니다. 은은한 플로럴 향과 라벤더빛 컬러가 손끝에 부드럽게 퍼지며, 흐린 공기 속에서도 마음을 조금 맑게 정리해줍니다.</p>
              </div>
            </div>

            <div class="curation-result-card" id="curation-result-card-2" style="position: absolute; left: 733px; top: 400px; width: 451px; height: 549px; background: white; border-radius: 20px; opacity: 0; filter: blur(24px); transform: translateY(40px);">
              <div style="width: 100%; height: 294px; background: #e0e0e0; border-radius: 20px 20px 0 0;"></div>
              <div style="padding: 25px 21px;">
                <h3 style="font-size: 32px; font-weight: bold; margin-bottom: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e1e1e;">Soft Reset Soap</h3>
                <p style="font-size: 14px; font-weight: 500; color: #666; margin-bottom: 20px; font-family: 'Pretendard', sans-serif;">#허브 #비 오는 날 #기분이 가라앉을 때, 환기가 필요할 때 #어두운 날 #여름</p>
                <p style="font-size: 16px; line-height: 1.6; font-family: 'Pretendard', sans-serif; color: #1e1e1e;">생각이 많고 머릿속이 복잡한 날, 손을 씻는 짧은 순간만큼은 가볍게 리셋될 수 있도록 도와주는 비누입니다. 세이지 그린 컬러와 허브 향이 답답한 기분을 덜어내고, 하루의 분위기를 부드럽게 전환해줍니다.</p>
              </div>
            </div>

            <div class="curation-result-card" id="curation-result-card-3" style="position: absolute; left: 1207px; top: 400px; width: 451px; height: 549px; background: white; border-radius: 20px; opacity: 0; filter: blur(24px); transform: translateY(40px);">
              <div style="width: 100%; height: 294px; background: #e0e0e0; border-radius: 20px 20px 0 0;"></div>
              <div style="padding: 25px 22px;">
                <h3 style="font-size: 32px; font-weight: bold; margin-bottom: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e1e1e;">Lavender Fog Soap</h3>
                <p style="font-size: 14px; font-weight: 500; color: #666; margin-bottom: 20px; font-family: 'Pretendard', sans-serif;">#워터리 플로럴 #비 오는 날 #차분해지고 싶을 때 #비 오는 날 #봄</p>
                <p style="font-size: 16px; line-height: 1.6; font-family: 'Pretendard', sans-serif; color: #1e1e1e;">흐릿한 안개가 낀 날처럼 마음이 어수선할 때, 차분한 라벤더 향으로 감정을 정돈해주는 비누입니다. 부드러운 퍼플빛 거품이 손을 감싸며 긴장을 낮추고, 조용히 숨을 고르는 듯한 시간을 만들어줍니다.</p>
              </div>
            </div>

            <div id="curation-phrase" style="position: absolute; left: 689px; top: 642px; width: 525px; height: 84px;">
              <p class="phrase-line" style="font-size: 32px; font-weight: bold; margin: 0; margin-bottom: 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e1e1e; text-align: center;">Curated by your answers.</p>
              <p class="phrase-line" style="font-size: 20px; font-weight: 500; color: #1e1e1e; margin: 0; position: absolute; left: 26px; font-family: 'Pretendard', sans-serif;">기분, 날씨, 계절 선택에 따라 추천 카드가 달라집니다.</p>
            </div>
          </div>
"""

# Find the end of the 5. Product-Use Case section and insert the new HTML
insertion_point = content.find('<!-- Curation Cards Container -->')
content = content[:insertion_point] + html_to_add + "\n" + content[insertion_point:]

# 3. Update JS Logic
# Add phase 2 states
js_vars = """
    let isCurationArrowRevealed = false;
    let isCurationCardsHidden = false;
    let isCurationPhase2Revealed = false;
"""
content = content.replace("    let isCurationArrowRevealed = false;\n    let isCurationCardsHidden = false;", js_vars)

# In handleGlobalScroll, if activeSectionIndex === 4
# We need to transition from phase 1 to phase 2
# Currently we have:
#       if (isCurationArrowRevealed && !isCurationCardsHidden) { ... }
#       else if (isCurationCardsHidden) { globalScrollAccumulator = 0; return; }

new_scroll_logic = """
      if (!isCurationArrowRevealed) {
        // ... (Keep existing Phase 1 reveal) -> But we replace the whole block to be safe.
"""

# Let's replace the scroll logic in handleGlobalScroll for index 4
old_scroll_block = """
      // Curation section intercept
      if (!isCurationArrowRevealed) {
        isCurationArrowRevealed = true;
        const arrow = document.getElementById('curation-arrow');
        if (arrow) {
          arrow.classList.add('visible');
        }
        globalScrollAccumulator = 0;

        // Automatically trigger next steps of animation
        if (!isCurationCardsHidden) {
          if (!isGlobalTransitioning) {
            isGlobalTransitioning = true;
            // Sequence: Wait 1 second (for arrow animation to finish), then slide out cards and fade out arrow
            setTimeout(() => {
              const cards = document.getElementById('curation-cards-container');
              if (cards) cards.classList.add('slide-out-left');
              if (arrow) {
                arrow.classList.remove('visible');
                arrow.classList.add('fade-out');
              }
              isCurationCardsHidden = true;
              isGlobalTransitioning = false;
            }, 1000);
          }
        }
        return;
      }

      if (isCurationArrowRevealed && !isCurationCardsHidden) {
        // Wait for animation to finish before allowing scroll
        globalScrollAccumulator = 0;
        return;
      }

      if (isCurationCardsHidden) {
        // Prevent scrolling to the next section immediately, wait for Phase 2!
        globalScrollAccumulator = 0;
        return;
      }
"""

new_scroll_block = """
      // Curation section intercept
      if (!isCurationArrowRevealed) {
        isCurationArrowRevealed = true;
        const arrow = document.getElementById('curation-arrow');
        if (arrow) {
          arrow.classList.add('visible');
        }
        globalScrollAccumulator = 0;

        // Automatically trigger next steps of animation Phase 1
        if (!isCurationCardsHidden) {
          if (!isGlobalTransitioning) {
            isGlobalTransitioning = true;
            setTimeout(() => {
              const cards = document.getElementById('curation-cards-container');
              if (cards) cards.classList.add('slide-out-left');
              if (arrow) {
                arrow.classList.remove('visible');
                arrow.classList.add('fade-out');
              }
              isCurationCardsHidden = true;
              isGlobalTransitioning = false;
            }, 1000);
          }
        }
        return;
      }

      if (isCurationArrowRevealed && !isCurationCardsHidden) {
        // Wait for phase 1 animation to finish
        globalScrollAccumulator = 0;
        return;
      }

      if (isCurationCardsHidden && !isCurationPhase2Revealed) {
        isCurationPhase2Revealed = true;
        globalScrollAccumulator = 0;
        
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

        isGlobalTransitioning = true;

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
            }, 1000);
          }, 1200);
        }, 1000);
        return;
      }

      if (isCurationPhase2Revealed && isGlobalTransitioning) {
        // Wait for phase 2 animations to finish
        globalScrollAccumulator = 0;
        return;
      }
"""

if "if (isCurationCardsHidden) {" in content:
    # Use regex to replace the old scroll block
    # It starts with '// Curation section intercept'
    # And ends with 'globalScrollAccumulator = 0;\n        return;\n      }' where isCurationCardsHidden check is.
    content = re.sub(
        r'// Curation section intercept\s*if \(\!isCurationArrowRevealed\) \{[\s\S]*?if \(isCurationCardsHidden\) \{\s*globalScrollAccumulator = 0;\s*return;\s*\}',
        new_scroll_block.strip(),
        content
    )


# Reset logic in triggerSectionAnimations for else if (index === 4)
new_reset_logic = """
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
"""

content = re.sub(r'\} else if \(index === 4\) \{[\s\S]*?\}', new_reset_logic.strip(), content)

with open("c:/Bloom/BLOOM_3.github.io/product.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
