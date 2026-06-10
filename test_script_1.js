
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

              // Reveal phrase slightly earlier to reduce wait time
              setTimeout(() => {
                const phraseContainer = document.getElementById('curation-phrase');
                if (phraseContainer) phraseContainer.style.opacity = '1';

                const phraseLines = document.querySelectorAll('#curation-phrase .phrase-line');
                if (phraseLines.length > 0) {
                  phraseLines[0].classList.add('revealed');
                }
                if (phraseLines.length > 1) {
                  setTimeout(() => phraseLines[1].classList.add('revealed'), 600);
                }
              }, 2200);

            }, 800);
          }
        });
      }
    });
  