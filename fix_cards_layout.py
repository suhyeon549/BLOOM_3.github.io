import re

with open('c:/Bloom/BLOOM_3.github.io/product.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I need to clean up everything from <!-- Curation Result Phase 2 --> to just before <!-- 4. Product - Key Features -->
start_marker = "<!-- Curation Result Phase 2 -->"
end_marker = """<div class="" data-node-id="71:1014" data-name="4. Product - Key Features" """

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_html = html[:start_idx] + start_marker + """
        <div id="curation-result-container" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; z-index: 20;">
          <img id="curation-arrow-2" src="assets/arrow1.png" style="position: absolute; left: 0; top: 681px; width: 266px; height: 6px; opacity: 0; transform: translateX(-100px); transition: opacity 1s ease, transform 1s ease;">

          <!-- Wrapper for cards and phrase so top value can be adjusted easily -->
          <div id="curation-result-wrapper" style="position: absolute; left: 0; top: 380px; width: 1920px; height: 700px;">
            <img class="curation-result-card" id="curation-result-card-1" src="assets/card1.png" style="position: absolute; left: 262px; top: 0px; width: 450px; height: 549px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); opacity: 0; filter: blur(24px); transform: translateY(40px);">
            <img class="curation-result-card" id="curation-result-card-2" src="assets/card2.png" style="position: absolute; left: 733px; top: 0px; width: 451px; height: 549px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); opacity: 0; filter: blur(24px); transform: translateY(40px);">
            <img class="curation-result-card" id="curation-result-card-3" src="assets/card3.png" style="position: absolute; left: 1207px; top: 0px; width: 451px; height: 549px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); opacity: 0; filter: blur(24px); transform: translateY(40px);">

            <div id="curation-phrase" style="position: absolute; left: 0; top: 580px; width: 1920px; display: flex; flex-direction: column; align-items: center; text-align: center;">
              <p class="phrase-line" style="font-size: 32px; font-weight: bold; margin: 0; margin-bottom: 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e1e1e;">Curated by your answers.</p>
              <p class="phrase-line" style="font-size: 20px; font-weight: 500; color: #1e1e1e; margin: 0; font-family: 'Pretendard', sans-serif;">기분, 날씨, 계절 선택에 따라 추천 카드가 달라집니다.</p>
            </div>
          </div>
        </div>
      </div>
        
        """ + html[end_idx:]
    
    with open('c:/Bloom/BLOOM_3.github.io/product.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Fixed cards layout")
else:
    print("Could not find markers")
