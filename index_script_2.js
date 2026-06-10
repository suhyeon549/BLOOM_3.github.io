
        let currentStep = 0; // 0, 1, 2
        let keyFeaturesStep = 0; // 0, 1, 2 for Key Features section
        let isAnimating = false;
        let currentScale1 = 1;

        const step1 = document.querySelector('[data-name="5. Main-How it works-step1"]');
        const step2 = document.querySelector('[data-name="5. Main-How it works-step2"]');
        const step3 = document.querySelector('[data-name="5. Main-How it works-step3"]');
        const ctaSection = document.querySelector('[data-name="6. Main-CTA"]');

        const s1Left = 0;
        const s2Left = 1920 + 260; // 2180
        const s3Left = 1920 + 2440; // 4360

        // 초기 트랜지션 설정 (step2, step3 전용)
        [step2, step3].forEach(el => {
            if (el) {
                el.style.transition = 'transform 1.4s cubic-bezier(0.65, 0, 0.35, 1)';
            }
        });

        // --- 스케일 업(Scale-up) 스크롤 이벤트 ---
        function updateScrollScales() {
            if (step1) {
                const rect1 = step1.getBoundingClientRect();
                let p1 = 1 - (rect1.top / window.innerHeight);
                if (p1 < 0) p1 = 0;
                if (p1 > 1) p1 = 1;

                const easeP1 = Math.sin(p1 * Math.PI / 2);
                currentScale1 = 0.8 + (0.2 * easeP1);

                step1.style.borderRadius = `${60 * (1 - easeP1)}px`;
                step1.style.transformOrigin = 'center top';

                // 화면 진입 중에는 지연 없이 즉각적으로 크기가 변하도록 트랜지션을 끕니다.
                // 화면 최상단에 닿아서 고정(Pin)되는 순간 다시 트랜지션을 켜서 가로 스크롤 애니메이션이 부드럽게 되도록 합니다.
                if (currentStep === 0 && rect1.top > 5) {
                    step1.style.transition = 'none';
                } else {
                    step1.style.transition = 'transform 1.4s cubic-bezier(0.65, 0, 0.35, 1)';
                }
            }
            if (ctaSection) {
                const rectCta = ctaSection.getBoundingClientRect();
                let pCta = 1 - (rectCta.top / window.innerHeight);
                if (pCta < 0) pCta = 0;
                if (pCta > 1) pCta = 1;

                const easePCta = Math.sin(pCta * Math.PI / 2);

                ctaSection.style.borderRadius = `${60 * (1 - easePCta)}px`;
                ctaSection.style.transformOrigin = 'center top';
                ctaSection.style.transform = `scale(${0.8 + (0.2 * easePCta)})`;
                ctaSection.style.transition = 'none';
            }
            updateSteps(); // 변동된 scale 값들을 적용
        }
        window.addEventListener('scroll', updateScrollScales);
        updateScrollScales();

        // --- 풀페이지 스냅 스크롤 제어 로직 ---
        let activeSectionIndex = 0;
        let globalScrollAccumulator = 0;
        let isGlobalTransitioning = false;
        let globalSections = [];

        // Animation state variables
        let isTypewriterFinished = false;
        let isTypewriterRunning = false;
        let section1EnterDirection = 'down';

        let typewriterTextData = [
            "우리는 날씨와 계절, 그날의 감정에 따라 옷을 고르고 향수를 고르며 공간의 분위기를 바꿉니다.",
            "하지만 손을 씻는 비누는 기능, 향만 보고 선택하게 됩니다.",
            "BLOOM은 이런 일상 속 작은 선택에도 나의 기분과 감각이 반영될 수 있다고 생각합니다."
        ];
        let currentP = 0;
        let currentChar = 0;

        function resetTypewriter() {
            isTypewriterFinished = false;
            currentP = 0;
            currentChar = 0;
            const container = document.getElementById('typewriter-text-container');
            if (container) {
                container.style.opacity = '1';
                const paragraphs = container.querySelectorAll('.tw-p');
                paragraphs.forEach(p => p.textContent = "");
            }
        }

        function advanceTypewriter() {
            const container = document.getElementById('typewriter-text-container');
            const paragraphs = container.querySelectorAll('.tw-p');

            if (currentP >= typewriterTextData.length) {
                isTypewriterFinished = true;
                return;
            }

            let targetText = typewriterTextData[currentP];
            currentChar += 5; // advance 5 chars
            if (currentChar > targetText.length) currentChar = targetText.length;

            if (paragraphs[currentP]) {
                paragraphs[currentP].textContent = targetText.substring(0, currentChar);
            }

            if (currentChar >= targetText.length) {
                currentP++;
                currentChar = 0;
                if (currentP >= typewriterTextData.length) {
                    isTypewriterFinished = true;
                }
            }
        }

        function triggerSectionAnimations(index) {
            if (index === 0) {
                const heroContent = document.getElementById('hero-content-wrapper');
                if (heroContent) {
                    heroContent.classList.remove('reveal-blur');
                    void heroContent.offsetWidth; // force reflow
                    heroContent.classList.add('reveal-blur');
                }
            } else if (index === 1) {
                const wavy = document.getElementById('what-is-bloom-text');
                if (wavy) {
                    wavy.classList.remove('reveal-wavy');
                    void wavy.offsetWidth; // force reflow
                    wavy.classList.add('reveal-wavy');
                }

                const problemItems = document.querySelectorAll('.problem-item');
                problemItems.forEach(item => {
                    item.classList.remove('reveal-item');
                    void item.offsetWidth;
                });

                for (let i = 1; i <= 3; i++) {
                    setTimeout(() => {
                        const items = document.querySelectorAll('.problem-item-' + i);
                        items.forEach(item => item.classList.add('reveal-item'));
                    }, 500 + (i * 200));
                }

                resetTypewriter();
            } else if (index === 2) {
                const solImg = document.getElementById('solution-img');
                const solT1 = document.getElementById('solution-text-1');
                const solT2 = document.getElementById('solution-text-2');

                if (solImg) {
                    solImg.classList.remove('reveal-wobble');
                    void solImg.offsetWidth;
                }
                if (solT1) {
                    solT1.classList.remove('reveal-fade');
                    void solT1.offsetWidth;
                }
                if (solT2) {
                    solT2.classList.remove('reveal-fade');
                    void solT2.offsetWidth;
                }

                // Delay the start until the section scrolls into view (approx 1000ms)
                setTimeout(() => {
                    if (solImg) solImg.classList.add('reveal-wobble');
                    setTimeout(() => {
                        if (solT1) solT1.classList.add('reveal-fade');
                    }, 300);

                    setTimeout(() => {
                        if (solT2) solT2.classList.add('reveal-fade');
                    }, 700);
                }, 1000);
            } else if (index === 3) {
                // 즉시 애니메이션 초기화 (순백의 배경 보장)
                const shaderCanvas = document.getElementById('kf-shader-canvas');
                if (shaderCanvas) {
                    shaderCanvas.style.transition = 'none';
                    shaderCanvas.style.opacity = '0';
                    void shaderCanvas.offsetWidth;
                    shaderCanvas.style.transition = 'opacity 1s ease';
                }

                const c1 = document.getElementById('kf-card-1');
                const t1 = document.getElementById('kf-title-1');
                const b1 = document.getElementById('kf-body-1');
                const p1 = document.getElementById('kf-img-container-1');

                if (c1) { c1.classList.remove('reveal-kf'); void c1.offsetWidth; }
                if (t1) { t1.classList.remove('reveal-kf'); void t1.offsetWidth; }
                if (b1) { b1.classList.remove('reveal-kf'); void b1.offsetWidth; }
                if (p1) { p1.classList.remove('reveal-kf'); void p1.offsetWidth; }

                // 화면이 Key Features 섹션으로 이동 완료할 즈음(1초 후) 애니메이션 순차 시작
                setTimeout(() => {
                    // 1. 폰트(셰이더) 애니메이션 먼저 시작
                    if (shaderCanvas) shaderCanvas.style.opacity = '1';

                    // 2. 약간의 시차(0.4초)를 두고 Card 1 등장
                    setTimeout(() => {
                        if (c1) c1.classList.add('reveal-kf');
                        if (t1) t1.classList.add('reveal-kf');
                        if (b1) b1.classList.add('reveal-kf');
                        if (p1) p1.classList.add('reveal-kf');
                    }, 400);
                }, 1000);
            } else if (index === 5) {
                // RESET INSTANTLY (Background only state, elements hidden without transition)
                const ctaTextIds = ['cta-title-1', 'cta-title-2', 'cta-title-3', 'cta-title-4', 'cta-title-5'];
                const ctaImg = document.getElementById('cta-img');
                const ctaBody = document.getElementById('cta-body');
                const ctaBtn1 = document.getElementById('cta-btn-1');
                const ctaBtn2 = document.getElementById('cta-btn-2');

                const allCtaElements = [...ctaTextIds.map(id => document.getElementById(id)), ctaImg, ctaBody, ctaBtn1, ctaBtn2].filter(Boolean);

                // Disable transitions to snap to hidden state instantly
                allCtaElements.forEach(el => {
                    el.style.transition = 'none';
                    el.classList.remove('reveal-cta');
                });

                // Force reflow
                void document.body.offsetWidth;

                // Restore transitions
                allCtaElements.forEach(el => {
                    el.style.transition = '';
                });

                // Wait for the scroll to finish (approx 1000ms), then start animations
                setTimeout(() => {
                    allCtaElements.forEach(el => {
                        el.classList.add('reveal-cta');
                    });
                }, 1000);
            }
        }

        // DOM이 로드된 후 섹션 요소들을 순서대로 배열에 담고, 화면을 강제로 맨 위로 올리거나 이전 위치를 복구합니다.
        window.addEventListener('DOMContentLoaded', () => {
            globalSections = [
                document.querySelector('[data-name="1. Main-Hero"]'),
                document.querySelector('[data-name="2. Main-Problem"]'),
                document.querySelector('[data-name="3. Main-Solution"]'),
                document.querySelector('[data-name="4. Main-Key Features"]'),
                step1, // 5. How it works
                ctaSection, // 6. CTA
                document.querySelector('[data-name="7. Main-Footer"]')
            ].filter(Boolean);

            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }

            const hashMatch = window.location.hash.match(/#section(\d+)/);
            let overrideSectionIndex = null;
            if (hashMatch) {
                overrideSectionIndex = parseInt(hashMatch[1], 10);
                // Clear the hash without jumping the page native behavior
                history.replaceState(null, null, window.location.pathname + window.location.search);
            }

            const savedState = sessionStorage.getItem('bloomScrollState');
            if (overrideSectionIndex !== null) {
                activeSectionIndex = overrideSectionIndex;
                currentStep = 0;
                keyFeaturesStep = 0;
                
                if (activeSectionIndex === 1) {
                    isTypewriterFinished = false; // Reset to play again
                }
                
                updateHeaderTheme();
                triggerSectionAnimations(activeSectionIndex);
                updateSteps();
                updateKeyFeatures();
                saveScrollState();
            } else if (savedState) {
                try {
                    const state = JSON.parse(savedState);
                    activeSectionIndex = state.activeSectionIndex || 0;

                    currentStep = state.currentStep || 0;
                    keyFeaturesStep = state.keyFeaturesStep || 0;

                    if (activeSectionIndex === 1) {
                        isTypewriterFinished = true;
                        currentP = typewriterTextData.length;
                        const container = document.getElementById('typewriter-text-container');
                        if (container) {
                            container.style.opacity = '1';
                            const paragraphs = container.querySelectorAll('.tw-p');
                            paragraphs.forEach((p, i) => { if (typewriterTextData[i]) p.textContent = typewriterTextData[i]; });
                        }
                    }

                    updateHeaderTheme();
                    triggerSectionAnimations(activeSectionIndex);
                    updateSteps();
                    updateKeyFeatures();
                } catch (e) { }
            } else {
                updateHeaderTheme();
                triggerSectionAnimations(activeSectionIndex);
                updateSteps();
                updateKeyFeatures();
            }

            setTimeout(() => {
                if (globalSections[activeSectionIndex]) {
                    const scale = window.innerWidth / 1920;
                    const targetTop = globalSections[activeSectionIndex].offsetTop * scale;
                    window.scrollTo(0, targetTop);
                } else {
                    window.scrollTo(0, 0);
                    updateHeaderTheme();
                }

                // Handle Entrance Animations
                const logoContainer = document.getElementById('header-logo-container');
                const navLinks = document.querySelectorAll('.header-nav-link');
                const heroContent = document.getElementById('hero-content-wrapper');

                if (activeSectionIndex === 0) {
                    if (logoContainer) logoContainer.classList.add('reveal-logo');
                    // heroContent is handled in triggerSectionAnimations(0)

                    // When Logo is ~50% opacity (0.4s into 0.8s animation), reveal menus with stagger
                    setTimeout(() => {
                        navLinks.forEach((link, index) => {
                            setTimeout(() => {
                                link.classList.add('reveal-menu');
                            }, index * 50);
                        });
                    }, 400);
                } else {
                    // Instantly reveal header elements without animation if loaded mid-page
                    if (logoContainer) {
                        logoContainer.style.transition = 'none';
                        logoContainer.classList.add('reveal-logo');
                        // Restore transition after a short delay in case of future animations
                        setTimeout(() => logoContainer.style.transition = '', 50);
                    }
                    navLinks.forEach(link => {
                        link.style.transition = 'none';
                        link.classList.add('reveal-menu');
                        setTimeout(() => link.style.transition = '', 50);
                    });
                }
            }, 50);
        });

        function updateHeaderTheme() {
            const logoImg = document.getElementById('header-logo-img');
            const navLinks = document.querySelectorAll('.header-nav-link');

            // 71:756 section is globalSections[2] (3. Main-Solution)
            // 5 is globalSections[5] (6. Main-CTA)
            if (activeSectionIndex === 2 || activeSectionIndex === 5) {
                if (logoImg) logoImg.src = 'assets/white_logo.png';
                navLinks.forEach(link => {
                    link.style.color = '#ffffff';
                });
            } else {
                if (logoImg) logoImg.src = 'assets/8b2a1f19e6af28330d562fc1475d0896e8becd6e.png';
                navLinks.forEach(link => {
                    link.style.color = '#1e1e1e';
                });
            }
        }

        // 1.2초짜리 시네마틱한 커스텀 스무스 스크롤 애니메이션
        function customSmoothScrollTo(targetY, duration) {
            const startY = window.scrollY;
            const difference = targetY - startY;
            const startTime = performance.now();

            function step(currentTime) {
                const elapsed = currentTime - startTime;
                let progress = elapsed / duration;
                if (progress > 1) progress = 1;

                const ease = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(0, startY + difference * ease);

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }
            requestAnimationFrame(step);
        }

        function saveScrollState() {
            sessionStorage.setItem('bloomScrollState', JSON.stringify({
                activeSectionIndex,
                currentStep,
                keyFeaturesStep
            }));
        }

        function handleGlobalScroll(deltaY) {
            if (isGlobalTransitioning) return;
            const currentSection = globalSections[activeSectionIndex];
            if (!currentSection) return;

            // 스크롤 방향이 바뀌면 누적된 게이지 초기화 (ex: 내리다가 올릴 때 즉각 반응하도록)
            if ((deltaY > 0 && globalScrollAccumulator < 0) || (deltaY < 0 && globalScrollAccumulator > 0)) {
                globalScrollAccumulator = 0;
            }

            globalScrollAccumulator += deltaY;

            if (globalScrollAccumulator > 0) { // 아래로 스크롤
                // 타자기 효과 인터셉트
                if (activeSectionIndex === 1 && !isTypewriterFinished && section1EnterDirection === 'down') {
                    if (globalScrollAccumulator > 30) {
                        advanceTypewriter();
                        globalScrollAccumulator = 0; // 스크롤 무효화 후 리셋
                    }
                    return;
                }

                let threshold = 800; // 섹션 간 기본 이동 요구치
                let isHowItWorks = (activeSectionIndex === 4); // How it works 섹션
                let isKeyFeatures = (activeSectionIndex === 3); // Key Features 섹션

                if (isHowItWorks) {
                    if (currentStep < 2) threshold = 300;
                    else threshold = 800; // 3단계에서 다음 섹션으로 갈 때는 다시 평소 스크롤만큼 요구
                } else if (isKeyFeatures) {
                    if (keyFeaturesStep < 2) threshold = 300;
                    else threshold = 800;
                } else if (activeSectionIndex === 5) {
                    threshold = 150; // 마지막 CTA 섹션에서 Footer로 넘어갈 때는 한 번 스크롤(150)만 요구
                }

                if (globalScrollAccumulator >= threshold) {
                    globalScrollAccumulator = 0;
                    isGlobalTransitioning = true;

                    if (isHowItWorks && currentStep < 2) {
                        currentStep++;
                        saveScrollState();
                        updateSteps();
                        setTimeout(() => isGlobalTransitioning = false, 1500); // 가로 슬라이드 딜레이 (1.4s + 0.1s)
                    } else if (isKeyFeatures && keyFeaturesStep < 2) {
                        keyFeaturesStep++;
                        saveScrollState();
                        updateKeyFeatures();
                        setTimeout(() => isGlobalTransitioning = false, 1000); // 0.8s 트랜지션 + 0.2s 딜레이
                    } else {
                        if (activeSectionIndex < globalSections.length - 1) {
                            activeSectionIndex++;
                            saveScrollState();
                            updateHeaderTheme();
                            if (activeSectionIndex === 1) section1EnterDirection = 'down';
                            triggerSectionAnimations(activeSectionIndex);
                            const scale = window.innerWidth / 1920;
                            const targetTop = globalSections[activeSectionIndex].offsetTop * scale;
                            customSmoothScrollTo(targetTop, 1200);

                            setTimeout(() => isGlobalTransitioning = false, 1400); // 부드러운 스크롤 딜레이 (1.2s + 0.2s)
                        } else {
                            isGlobalTransitioning = false; // 맨 밑
                        }
                    }
                }
            } else if (globalScrollAccumulator < 0) { // 위로 스크롤
                // 타자기 효과 인터셉트 (위로 스크롤 진입 시)
                if (activeSectionIndex === 1 && !isTypewriterFinished && section1EnterDirection === 'up') {
                    if (globalScrollAccumulator < -30) {
                        advanceTypewriter();
                        globalScrollAccumulator = 0; // 스크롤 무효화 후 리셋
                    }
                    return;
                }

                let threshold = -800;
                let isHowItWorks = (activeSectionIndex === 4);
                let isKeyFeatures = (activeSectionIndex === 3);

                if (isHowItWorks) {
                    if (currentStep > 0) threshold = -300;
                    else threshold = -800;
                } else if (isKeyFeatures) {
                    if (keyFeaturesStep > 0) threshold = -300;
                    else threshold = -800;
                } else if (activeSectionIndex === 6) {
                    threshold = -150; // Footer에서 CTA로 올라올 때도 한 번 스크롤만 요구
                }

                if (globalScrollAccumulator <= threshold) {
                    globalScrollAccumulator = 0;
                    isGlobalTransitioning = true;

                    if (isHowItWorks && currentStep > 0) {
                        currentStep--;
                        saveScrollState();
                        updateSteps();
                        setTimeout(() => isGlobalTransitioning = false, 1500);
                    } else if (isKeyFeatures && keyFeaturesStep > 0) {
                        keyFeaturesStep--;
                        saveScrollState();
                        updateKeyFeatures();
                        setTimeout(() => isGlobalTransitioning = false, 1000);
                    } else {
                        if (activeSectionIndex > 0) {
                            activeSectionIndex--;
                            if (activeSectionIndex === 3) {
                                keyFeaturesStep = 0;
                                updateKeyFeatures();
                            }
                            saveScrollState();
                            updateHeaderTheme();
                            if (activeSectionIndex === 1) section1EnterDirection = 'up';
                            triggerSectionAnimations(activeSectionIndex);
                            const scale = window.innerWidth / 1920;
                            const targetTop = globalSections[activeSectionIndex].offsetTop * scale;
                            customSmoothScrollTo(targetTop, 1200);

                            setTimeout(() => isGlobalTransitioning = false, 1400);
                        } else {
                            isGlobalTransitioning = false; // 맨 위
                        }
                    }
                }
            }
        }

        // 전체 페이지 스크롤 강제 제어 (마우스 휠)
        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            handleGlobalScroll(e.deltaY);
        }, { passive: false });

        // 터치 지원 (모바일/트랙패드 제스처)
        let touchStartY = 0;
        window.addEventListener('touchstart', e => {
            touchStartY = e.touches[0].clientY;
        }, { passive: false });

        window.addEventListener('touchmove', e => {
            e.preventDefault();
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;
            handleGlobalScroll(deltaY * 2); // 터치는 민감도를 높임
        }, { passive: false });

        // 키보드(스페이스, 방향키 등) 개입 방지 및 지원
        window.addEventListener('keydown', (e) => {
            const keys = { 'ArrowUp': -500, 'ArrowDown': 500, 'PageUp': -1500, 'PageDown': 1500, 'Space': 1500 };
            if (keys[e.code]) {
                e.preventDefault();
                handleGlobalScroll(keys[e.code]);
            }
        }, { passive: false });

        function updateKeyFeatures() {
            const card2 = document.getElementById('kf-card-2');
            const card3 = document.getElementById('kf-card-3');

            // 기존 이미지 윗부분이 아닌 도형 윗부분에 맞추기 위한 translate 값입니다.
            // (사용자 시각적 조정값: card2 -600px, card3 -1200px)
            const card2Translate = -600;
            const card3Translate = -1200;

            if (keyFeaturesStep === 0) {
                if (card2) card2.style.transform = `translateY(0px)`;
                if (card3) card3.style.transform = `translateY(0px)`;
            } else if (keyFeaturesStep === 1) {
                if (card2) card2.style.transform = `translateY(${card2Translate}px)`;
                if (card3) card3.style.transform = `translateY(${card2Translate}px)`;

                // Reveal Card 2
                const c2 = document.getElementById('kf-card-2');
                const t2 = document.getElementById('kf-title-2');
                const b2 = document.getElementById('kf-body-2');
                const p2 = document.getElementById('kf-img-container-2');
                if (c2) c2.classList.add('reveal-kf');
                if (t2) t2.classList.add('reveal-kf');
                if (b2) b2.classList.add('reveal-kf');
                if (p2) p2.classList.add('reveal-kf');
            } else if (keyFeaturesStep === 2) {
                if (card2) card2.style.transform = `translateY(${card2Translate}px)`;
                if (card3) card3.style.transform = `translateY(${card3Translate}px)`;

                // Reveal Card 3
                const c3 = document.getElementById('kf-card-3');
                const t3 = document.getElementById('kf-title-3');
                const b3 = document.getElementById('kf-body-3');
                const p3 = document.getElementById('kf-img-container-3');
                if (c3) c3.classList.add('reveal-kf');
                if (t3) t3.classList.add('reveal-kf');
                if (b3) b3.classList.add('reveal-kf');
                if (p3) p3.classList.add('reveal-kf');
            }
        }

        function updateSteps() {
            let offset = 0;
            if (currentStep === 1) offset = -s2Left;
            if (currentStep === 2) offset = -s3Left;

            if (step1) step1.style.transform = `translateX(${offset}px) scale(${currentScale1})`;
            if (step2) step2.style.transform = `translateX(${offset}px)`;
            if (step3) step3.style.transform = `translateX(${offset}px)`;
        }
    