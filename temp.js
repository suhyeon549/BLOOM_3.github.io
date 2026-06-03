
    const globalSections = [
      document.querySelector('[data-name="1. Product-Hero"]'),
      document.querySelector('[data-name="2. Product-Problem"]'),
      document.querySelector('[data-name="3. Product-How it works"]'),
      document.querySelector('[data-name="4. Product - Key Features"]'),
      document.querySelector('[data-name="5. Product-Use Case"]'),
      document.querySelector('[data-name="6. Product-CTA"]'),
      document.querySelector('[data-name="7. Product-Footer"]')
    ];

    let activeSectionIndex = 0;
    let isGlobalTransitioning = false;
    let globalScrollAccumulator = 0;

    // Typewriter Animation State


    let isCurationArrowRevealed = false;
    let isCurationCardsHidden = false;
    let isCurationPhase2Revealed = false;

    let isTypewriterFinished = false;
    let section1EnterDirection = 'down';
    let typewriterTextData = [
      "사용자는 기분, 날씨, 계절에 따라 어울리는 제품을 고르고",
      "싶지만, 기존 비누 탐색은 대부분 향, 패키지, 기능 중심으로",
      "이루어집니다.",
      "그래서 “내가 원하는 기분이나 상황에 맞는 비누가 있었으면",
      "좋겠다\"는 기대가 있어도, 어떤 비누가 나의 무드와 잘 맞는지",
      "판단하기 어렵습니다."
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

    function updateScale() {
      const canvas = document.getElementById('canvas');
      const scaler = document.getElementById('scaler');
      const headerScaler = document.getElementById('header-scaler');
      const scale = window.innerWidth / 1920;

      if (scale < 1) {
        canvas.style.transform = `scale(${scale})`;
        canvas.style.transformOrigin = "top left";
        canvas.style.left = "0";
        scaler.style.height = `${6780 * scale}px`;
        if (headerScaler) {
          headerScaler.style.transform = `scale(${scale})`;
          headerScaler.style.left = "0";
        }
      } else {
        canvas.style.transform = 'scale(1)';
        canvas.style.transformOrigin = "top center";
        canvas.style.left = "50%";
        canvas.style.transform = "translateX(-50%)";
        scaler.style.height = '6780px';
        if (headerScaler) {
          headerScaler.style.transform = 'scale(1) translateX(-50%)';
          headerScaler.style.left = "50%";
        }
      }

      // Re-snap to current section on resize
      if (globalSections[activeSectionIndex]) {
        const targetY = globalSections[activeSectionIndex].offsetTop * (scale < 1 ? scale : 1);
        window.scrollTo(0, targetY);
      }
    }
    window.addEventListener('resize', updateScale);

    // Run immediately to set initial scale
    updateScale();

    document.addEventListener("DOMContentLoaded", () => {
      // Restore scroll state or snap to top
      const savedState = sessionStorage.getItem('bloomProductScrollState');

      setTimeout(() => {
        const scale = window.innerWidth / 1920 < 1 ? window.innerWidth / 1920 : 1;

        if (savedState) {
          const state = JSON.parse(savedState);
          activeSectionIndex = state.activeSectionIndex || 0;
          if (state.currentP !== undefined) currentP = state.currentP;
          if (state.isTypewriterFinished !== undefined) isTypewriterFinished = state.isTypewriterFinished;

          if (globalSections[activeSectionIndex]) {
            window.scrollTo(0, globalSections[activeSectionIndex].offsetTop * scale);
          }
          updateHeaderTheme();

          // Immediately render text if returning mid-page
          if (activeSectionIndex >= 1 && isTypewriterFinished) {
            currentP = typewriterTextData.length;
            const container = document.getElementById('typewriter-text-container');
            if (container) {
              container.style.opacity = '1';
              const paragraphs = container.querySelectorAll('.tw-p');
              paragraphs.forEach((p, i) => { if (typewriterTextData[i]) p.textContent = typewriterTextData[i]; });
            }
          }
        } else {
          window.scrollTo(0, 0);
          updateHeaderTheme();
        }

        triggerSectionAnimations(activeSectionIndex);

        // Handle Entrance Animations
        const logoContainer = document.getElementById('header-logo-container');
        const navLinks = document.querySelectorAll('.header-nav-link');

        if (activeSectionIndex === 0) {
          if (logoContainer) logoContainer.classList.add('reveal-logo');

          setTimeout(() => {
            navLinks.forEach((link, index) => {
              setTimeout(() => {
                link.classList.add('reveal-menu');
              }, index * 50);
            });
          }, 400);
        } else {
          if (logoContainer) {
            logoContainer.style.transition = 'none';
            logoContainer.classList.add('reveal-logo');
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

      // Black background sections: 2, 5, 6
      if (activeSectionIndex === 2 || activeSectionIndex === 5 || activeSectionIndex === 6) {
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
      sessionStorage.setItem('bloomProductScrollState', JSON.stringify({
        activeSectionIndex,
        currentP,
        isTypewriterFinished
      }));
    }

    function handleGlobalScroll(deltaY) {
      if (isGlobalTransitioning) return;
      const currentSection = globalSections[activeSectionIndex];
      if (!currentSection) return;

      if ((deltaY > 0 && globalScrollAccumulator < 0) || (deltaY < 0 && globalScrollAccumulator > 0)) {
        globalScrollAccumulator = 0;
      }

      globalScrollAccumulator += deltaY;

      if (globalScrollAccumulator > 0) { // Scroll down

        

        // Typewriter intercept
        if (activeSectionIndex === 1 && !isTypewriterFinished && section1EnterDirection === 'down') {
          if (globalScrollAccumulator > 30) {
            advanceTypewriter();
            globalScrollAccumulator = 0;
          }
          return;
        }

        let threshold = 800;

        if (globalScrollAccumulator > threshold) {
          if (activeSectionIndex < globalSections.length - 1) {
            isGlobalTransitioning = true;
            activeSectionIndex++;
            updateHeaderTheme();
            if (activeSectionIndex === 1) section1EnterDirection = 'down';

            const scale = window.innerWidth / 1920 < 1 ? window.innerWidth / 1920 : 1;
            const targetY = globalSections[activeSectionIndex].offsetTop * scale;

            customSmoothScrollTo(targetY, 1200);
            saveScrollState();
            triggerSectionAnimations(activeSectionIndex);

            setTimeout(() => {
              isGlobalTransitioning = false;
              globalScrollAccumulator = 0;
            }, 1300);
          } else {
            globalScrollAccumulator = threshold;
          }
        }
      } else if (globalScrollAccumulator < 0) { // Scroll up
        // Typewriter intercept
        if (activeSectionIndex === 1 && !isTypewriterFinished && section1EnterDirection === 'up') {
          if (globalScrollAccumulator < -30) {
            advanceTypewriter();
            globalScrollAccumulator = 0;
          }
          return;
        }

        let threshold = -800;

        if (globalScrollAccumulator < threshold) {
          if (activeSectionIndex > 0) {
            isGlobalTransitioning = true;
            activeSectionIndex--;
            updateHeaderTheme();
            if (activeSectionIndex === 1) section1EnterDirection = 'up';

            const scale = window.innerWidth / 1920 < 1 ? window.innerWidth / 1920 : 1;
            const targetY = globalSections[activeSectionIndex].offsetTop * scale;

            customSmoothScrollTo(targetY, 1200);
            saveScrollState();
            triggerSectionAnimations(activeSectionIndex);

            setTimeout(() => {
              isGlobalTransitioning = false;
              globalScrollAccumulator = 0;
            }, 1300);
          } else {
            globalScrollAccumulator = threshold;
          }
        }
      }
    }

    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      handleGlobalScroll(e.deltaY);
    }, { passive: false });

    function triggerSectionAnimations(index) {
      if (index === 0) {
        const cardImg = document.querySelector('[data-node-id="71:980"]');
        if (cardImg && !cardImg.classList.contains('reveal-blur')) {
          cardImg.classList.add('reveal-blur');
        }

        // Stagger for inner elements of Hero Card
        const heroTitle = document.querySelector('[data-node-id="71:986"]');
        const heroBody = document.querySelector('[data-node-id="71:991"]');
        const heroBtn1 = document.querySelector('[data-node-id="71:987"]');
        const heroBtn2 = document.querySelector('[data-node-id="71:989"]');

        setTimeout(() => { if (heroTitle) heroTitle.classList.add('visible'); }, 800);
        setTimeout(() => { if (heroBody) heroBody.classList.add('visible'); }, 1000);
        setTimeout(() => { if (heroBtn1) heroBtn1.classList.add('visible'); }, 1200);
        setTimeout(() => { if (heroBtn2) heroBtn2.classList.add('visible'); }, 1300);
      } else if (index === 1) {
        // Problem Section Stagger
        const mainTitle = document.querySelector('[data-node-id="71:945"]');
        const mainBody = document.querySelector('[data-node-id="79:96"]');

        const photo1 = document.querySelector('[data-node-id="71:929"]');
        const text1_1 = document.querySelector('[data-node-id="71:936"]');
        const text1_2 = document.querySelector('[data-node-id="71:934"]');
        const text1_3 = document.querySelector('[data-node-id="71:935"]');

        const photo2 = document.querySelector('[data-node-id="71:931"]');
        const text2_1 = document.querySelector('[data-node-id="71:944"]');
        const text2_2 = document.querySelector('[data-node-id="71:942"]');
        const text2_3 = document.querySelector('[data-node-id="71:943"]');

        const photo3 = document.querySelector('[data-node-id="71:930"]');
        const text3_1 = document.querySelector('[data-node-id="71:940"]');
        const text3_2 = document.querySelector('[data-node-id="71:938"]');
        const text3_3 = document.querySelector('[data-node-id="71:939"]');

        if (mainTitle) {
          setTimeout(() => { mainTitle.classList.add('visible'); }, 500);
        }

        resetTypewriter();

        setTimeout(() => {
          if (photo1) photo1.classList.add('visible');
          if (text1_1) text1_1.classList.add('visible');
          if (text1_2) text1_2.classList.add('visible');
          if (text1_3) text1_3.classList.add('visible');
        }, 700);

        setTimeout(() => {
          if (photo2) photo2.classList.add('visible');
          if (text2_1) text2_1.classList.add('visible');
          if (text2_2) text2_2.classList.add('visible');
          if (text2_3) text2_3.classList.add('visible');
        }, 900);

        setTimeout(() => {
          if (photo3) photo3.classList.add('visible');
          if (text3_1) text3_1.classList.add('visible');
          if (text3_2) text3_2.classList.add('visible');
          if (text3_3) text3_3.classList.add('visible');
        }, 1100);
      } else if (index === 2) {
        const s1 = document.querySelector('.step-01');
        const s2 = document.querySelector('.step-02');
        const s3 = document.querySelector('.step-03');
        if (s1) setTimeout(() => s1.classList.add('visible'), 500);
        if (s2) setTimeout(() => s2.classList.add('visible'), 800);
        if (s3) setTimeout(() => s3.classList.add('visible'), 1100);
      } else if (index === 3) {
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
        // Sequential appearance of texts and question card
        setTimeout(() => {
          const t1 = document.getElementById('curation-text-1');
          if (t1) t1.classList.add('visible');
        }, 100);
        setTimeout(() => {
          const t2 = document.getElementById('curation-text-2');
          if (t2) t2.classList.add('visible');
        }, 600);
        setTimeout(() => {
          const qc = document.getElementById('curation-question-card');
          if (qc) qc.classList.add('visible');
        }, 1100);
      }
    }
  

    document.addEventListener('DOMContentLoaded', () => {
      let questionLocked = false;
      let revealedCards = [];

      // 1. Question card buttons logic
      const questionBtns = document.querySelectorAll('#curation-question-card .curation-btn');
      const nextBtn = document.getElementById('curation-next-btn');
      
      questionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (questionLocked) return; // Requirement 3: Lock after next click
          
          btn.classList.toggle('selected');
          
          let anySelected = false;
          questionBtns.forEach(b => {
            if (b.classList.contains('selected')) anySelected = true;
          });
          
          if (nextBtn) {
            if (anySelected) {
              nextBtn.classList.add('visible');
            } else {
              nextBtn.classList.remove('visible');
            }
          }
        });
      });

      // 2. Paired cards exclusive selection logic
      const pairedCards = [
        document.querySelector('[data-name="step2"]'),
        document.querySelector('[data-name="step3"]'),
        document.querySelector('[data-name="Component 7"]')
      ];

      pairedCards.forEach(card => {
        if (!card) return;
        const btnsInCard = card.querySelectorAll('.curation-btn');
        btnsInCard.forEach(btn => {
          btn.addEventListener('click', () => {
            // Exclusive selection (Requirement 1)
            btnsInCard.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Check if all revealed cards have at least one selection (Requirement 2)
            if (revealedCards.length > 0) {
              let allSatisfied = true;
              revealedCards.forEach(rCard => {
                const rBtns = rCard.querySelectorAll('.curation-btn');
                let cardHasSelection = false;
                rBtns.forEach(rb => {
                  if (rb.classList.contains('selected')) cardHasSelection = true;
                });
                if (!cardHasSelection) allSatisfied = false;
              });

              if (allSatisfied && nextBtn) {
                // To indicate it's for the final result, we can just show the same next button
                nextBtn.classList.add('visible');
                // We'll also change its text to indicate completion
                nextBtn.innerText = "Show Result"; 
              }
            }
          });
        });
      });

      // 3. Next Button click logic
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (!questionLocked) {
            // First time clicking Next (from Question Card)
            questionLocked = true; // Lock question buttons
            nextBtn.classList.remove('visible'); // Hide it
            
            const b17 = document.querySelector('[data-name="button17"]'); // 기분
            const b16 = document.querySelector('[data-name="button16"]'); // 날씨
            const b15 = document.querySelector('[data-name="button15"]'); // 계절
            
            if (b17 && b17.classList.contains('selected')) revealedCards.push(document.querySelector('[data-name="step2"]'));
            if (b16 && b16.classList.contains('selected')) revealedCards.push(document.querySelector('[data-name="step3"]'));
            if (b15 && b15.classList.contains('selected')) revealedCards.push(document.querySelector('[data-name="Component 7"]'));
            
            revealedCards.forEach((card, i) => {
              if (card) {
                setTimeout(() => {
                  card.classList.add('revealed');
                }, i * 300); // 300ms gap between reveals
              }
            });
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
              console.log("Cards slided out. Ready for phase 2.");
              
              // Reveal result cards (Group 68, 69, 70 equivalent)
                            const resultContainer = document.getElementById('curation-result-container');
              if (resultContainer) {
                  resultContainer.style.pointerEvents = 'auto';
              }
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
              
            }, 800);
          }
        });
      }
    });
  

    
