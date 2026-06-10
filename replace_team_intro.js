const fs = require('fs');
let html = fs.readFileSync('team.html', 'utf8');

const newContent = `<div id="team-intro-wrapper" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;">
    
    <!-- Title: BLOOM MAKERS. -->
    <p class="fade-up" style="word-break: break-word; position: absolute; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; line-height: 0.95; left: 140px; color: #1e1e1e; font-size: 130px; top: 180px; letter-spacing: -6px; white-space: nowrap;">
        BLOOM MAKERS.
    </p>

    <!-- Profiles Container -->
    <div style="position: absolute; display: flex; flex-direction: column; gap: 80px; left: 1000px; top: 320px; width: 780px;">
        
        <!-- Profile 1: Yeon Suhyeon -->
        <div class="fade-up delay-100" style="display: flex; flex-direction: row; gap: 40px; align-items: flex-start;">
            <!-- Photo Box -->
            <div style="width: 280px; height: 186px; background-color: #f5f6fb; position: relative; overflow: hidden; flex-shrink: 0;">
                <img src="assets/d225f04551825fa5627a0c5098dff2b78fff4438.png" style="position: absolute; height: 118%; left: 19%; top: 0; width: 60%; object-fit: cover;" alt="">
                <p style="position: absolute; left: 16px; bottom: 16px; margin: 0; font-family: 'Helvetica Neue', sans-serif; font-weight: 600; font-size: 14px; color: rgba(182,182,182,0.9); letter-spacing: 0.5px;">YEON SUHYEON</p>
            </div>
            <!-- Text Box -->
            <div style="display: flex; flex-direction: column; width: 460px;">
                <p style="font-family: 'Helvetica Neue', sans-serif; font-weight: 700; font-size: 24px; color: #1e1e1e; line-height: 1.2; letter-spacing: -0.5px; margin: 0;">BRAND PLANNER | UX DIRECTOR<br>DEVELOPER</p>
                <p style="font-family: 'Pretendard', sans-serif; font-weight: 400; font-size: 14px; color: #1e1e1e; line-height: 1.5; margin: 20px 0 0 0; letter-spacing: -0.3px; word-break: keep-all;">
                    BLOOM의 브랜드 방향과 큐레이션 서비스의 사용 흐름을 기획했습니다.<br>또한 비주얼과 어울리는 인터랙션을 디자인하고 실제 웹으로 구현했습니다.
                </p>
                <!-- Tags -->
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px;">
                    <span style="border: 1px solid #1e1e1e; border-radius: 20px; padding: 4px 12px; font-family: 'Helvetica Neue', sans-serif; font-size: 11px; font-weight: 500; color: #1e1e1e;">#Project Planner</span>
                    <span style="border: 1px solid #1e1e1e; border-radius: 20px; padding: 4px 12px; font-family: 'Helvetica Neue', sans-serif; font-size: 11px; font-weight: 500; color: #1e1e1e;">#Web Developer</span>
                    <span style="border: 1px solid #1e1e1e; border-radius: 20px; padding: 4px 12px; font-family: 'Helvetica Neue', sans-serif; font-size: 11px; font-weight: 500; color: #1e1e1e;">#UX Flow Designer</span>
                    <span style="border: 1px solid #1e1e1e; border-radius: 20px; padding: 4px 12px; font-family: 'Helvetica Neue', sans-serif; font-size: 11px; font-weight: 500; color: #1e1e1e;">#Interaction Designer</span>
                    <span style="border: 1px solid #1e1e1e; border-radius: 20px; padding: 4px 12px; font-family: 'Helvetica Neue', sans-serif; font-size: 11px; font-weight: 500; color: #1e1e1e;">#AI Visual Production</span>
                </div>
            </div>
        </div>

        <!-- Profile 2: Chu Joohyeon -->
        <div class="fade-up delay-200" style="display: flex; flex-direction: row; gap: 40px; align-items: flex-start;">
            <!-- Photo Box -->
            <div style="width: 280px; height: 186px; background-color: #f5f7fc; position: relative; overflow: hidden; flex-shrink: 0;">
                <img src="assets/36c18e0d53dbb35f676499ddd7f36fe2c2384692.png" style="position: absolute; height: 105%; left: 22%; top: 7%; width: 54%; object-fit: cover;" alt="">
                <p style="position: absolute; left: 16px; bottom: 16px; margin: 0; font-family: 'Helvetica Neue', sans-serif; font-weight: 600; font-size: 14px; color: rgba(182,182,182,0.9); letter-spacing: 0.5px;">CHU JOOHYEON</p>
            </div>
            <!-- Text Box -->
            <div style="display: flex; flex-direction: column; width: 460px;">
                <p style="font-family: 'Helvetica Neue', sans-serif; font-weight: 700; font-size: 24px; color: #1e1e1e; line-height: 1.2; letter-spacing: -0.5px; margin: 0;">VISUAL DESIGNER | UI DIRECTOR</p>
                <p style="font-family: 'Pretendard', sans-serif; font-weight: 400; font-size: 14px; color: #1e1e1e; line-height: 1.5; margin: 20px 0 0 0; letter-spacing: -0.3px; word-break: keep-all;">
                    BLOOM의 브랜드 이미지를 웹 안에서 시각화하며, 레이아웃과 카드<br>UI를 설계하고, 부드러운 색감과 여백을 통해 감각 큐레이션 경험을<br>구현했습니다.
                </p>
                <!-- Tags -->
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px;">
                    <span style="border: 1px solid #1e1e1e; border-radius: 20px; padding: 4px 12px; font-family: 'Helvetica Neue', sans-serif; font-size: 11px; font-weight: 500; color: #1e1e1e;">#Project Planner</span>
                    <span style="border: 1px solid #1e1e1e; border-radius: 20px; padding: 4px 12px; font-family: 'Helvetica Neue', sans-serif; font-size: 11px; font-weight: 500; color: #1e1e1e;">#UI Designer</span>
                    <span style="border: 1px solid #1e1e1e; border-radius: 20px; padding: 4px 12px; font-family: 'Helvetica Neue', sans-serif; font-size: 11px; font-weight: 500; color: #1e1e1e;">#AI Visual Production</span>
                    <span style="border: 1px solid #1e1e1e; border-radius: 20px; padding: 4px 12px; font-family: 'Helvetica Neue', sans-serif; font-size: 11px; font-weight: 500; color: #1e1e1e;">#Visual Director</span>
                </div>
            </div>
        </div>

    </div>
</div>`;

const startIdx = html.indexOf('<div id="team-intro-wrapper"');
if (startIdx !== -1) {
    const endIdxStr = '<!-- If there is something specific, we replace carefully -->';
    // Let's replace the content between <div id="team-intro-wrapper" and the next </div> that matches it.
    // team-intro-wrapper ends around line 195 (based on my previous view_file).
    // Let's find the closing tag.
    let remaining = html.substring(startIdx);
    // Find the end of data-node-id="124:142" section
    const section3Start = html.indexOf('data-name="3. Team-Our Mission"');
    if (section3Start !== -1) {
        // the wrapper ends before section 3
        const prevDivEnd = html.lastIndexOf('</div>', section3Start);
        const prevPrevDivEnd = html.lastIndexOf('</div>', prevDivEnd - 1);
        
        // Let's just do a string replacement for the exact start to end of team-intro-wrapper
        // A better way is regex matching if it's well formed, or just indexOf based on known text.
        const titleMatch = 'BLOOM MAKERS.</p>';
        const titleEndIdx = html.indexOf(titleMatch, startIdx);
        if (titleEndIdx !== -1) {
            const wrapperEnd = html.indexOf('</div>', titleEndIdx) + 6;
            html = html.substring(0, startIdx) + newContent + html.substring(wrapperEnd);
            fs.writeFileSync('team.html', html);
            console.log('Successfully replaced team-intro-wrapper');
        } else {
            console.log('Title not found');
        }
    } else {
        console.log('Section 3 not found');
    }
} else {
    console.log('team-intro-wrapper not found');
}
