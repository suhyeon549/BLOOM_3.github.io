import re

with open("c:/Bloom/BLOOM_3.github.io/product.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove the old (possibly corrupted) Phase 2 container.
# We will just look for `<!-- Curation Result Phase 2 -->` and cut until `          </div>\n\n>` or `          </div>` at the end of file.
pattern = re.compile(r'<!-- Curation Result Phase 2 -->.*', re.DOTALL)
content = pattern.sub('', content).strip()

# Now the content ends around `</html>` properly?
# Wait, let's make sure `</html>` is preserved if it was deleted.
if "</html>" not in content:
    if "</html" in content:
        content = content.replace("</html", "</html>")
    else:
        content += "\n</html>"

clean_phase2 = """
        <!-- Curation Result Phase 2 -->
        <div id="curation-result-container" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; z-index: 20; display: none;">
          <img id="curation-arrow-2" src="assets/arrow1.png" style="position: absolute; left: 0; top: 681px; width: 266px; height: 6px; opacity: 0; transform: translateX(-100px); transition: opacity 1s ease, transform 1s ease;">

          <div class="curation-result-card" id="curation-result-card-1" style="position: absolute; left: 262px; top: 400px; width: 450px; height: 549px; background: white; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); opacity: 0; filter: blur(24px); transform: translateY(40px);">
            <div style="width: 100%; height: 294px; background: #e0e0e0; border-radius: 20px 20px 0 0;"></div>
            <div style="padding: 25px 20px;">
              <h3 style="font-size: 32px; font-weight: bold; margin-bottom: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e1e1e;">Rainy Bloom Soap</h3>
              <p style="font-size: 14px; font-weight: 500; color: #666; margin-bottom: 20px; font-family: 'Pretendard', sans-serif;">#워터리 플로럴 #비 오는 날 #기분이 가라앉을 때, 환기가 필요할 때 #비 오는 날 #봄</p>
              <p style="font-size: 16px; line-height: 1.6; font-family: 'Pretendard', sans-serif; color: #1e1e1e;">비가 조용히 내리는 오후, 무겁게 가라앉은 기분을 급하게 끌어올리기보다 천천히 환기하고 싶을 때 어울리는 비누입니다. 은은한 플로럴 향과 라벤더빛 컬러가 손끝에 부드럽게 퍼지며, 흐린 공기 속에서도 마음을 조금 맑게 정리해줍니다.</p>
            </div>
          </div>

          <div class="curation-result-card" id="curation-result-card-2" style="position: absolute; left: 733px; top: 400px; width: 451px; height: 549px; background: white; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); opacity: 0; filter: blur(24px); transform: translateY(40px);">
            <div style="width: 100%; height: 294px; background: #e0e0e0; border-radius: 20px 20px 0 0;"></div>
            <div style="padding: 25px 21px;">
              <h3 style="font-size: 32px; font-weight: bold; margin-bottom: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e1e1e;">Soft Reset Soap</h3>
              <p style="font-size: 14px; font-weight: 500; color: #666; margin-bottom: 20px; font-family: 'Pretendard', sans-serif;">#허브 #비 오는 날 #기분이 가라앉을 때, 환기가 필요할 때 #어두운 날 #여름</p>
              <p style="font-size: 16px; line-height: 1.6; font-family: 'Pretendard', sans-serif; color: #1e1e1e;">생각이 많고 머릿속이 복잡한 날, 손을 씻는 짧은 순간만큼은 가볍게 리셋될 수 있도록 도와주는 비누입니다. 세이지 그린 컬러와 허브 향이 답답한 기분을 덜어내고, 하루의 분위기를 부드럽게 전환해줍니다.</p>
            </div>
          </div>

          <div class="curation-result-card" id="curation-result-card-3" style="position: absolute; left: 1207px; top: 400px; width: 451px; height: 549px; background: white; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); opacity: 0; filter: blur(24px); transform: translateY(40px);">
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

# Find the target block for Section 6 (it says 4. Product - Key Features, but wait: the data-name is 4. Product - Key Features)
target = '<div class="" data-node-id="71:1014" data-name="4. Product - Key Features"'
idx = content.find(target)
if idx != -1:
    content = content[:idx] + clean_phase2 + "\n        " + content[idx:]

with open("c:/Bloom/BLOOM_3.github.io/product.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
