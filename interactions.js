// interactions.js - Global interactions for BLOOM

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Intersection Observer for fade-up elements
    const observerOptions = {
        root: null,
        // Trigger slightly before it comes fully into view, or slightly after depending on preference
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
});

window.navigateTo = function(targetPage, targetSectionIndex) {
    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage || currentPage === '') currentPage = 'index.html';
    
    if (currentPage.toLowerCase() === targetPage.toLowerCase()) {
        if (typeof activeSectionIndex !== 'undefined') {
            activeSectionIndex = targetSectionIndex;
            const scale = window.innerWidth / 1920;
            
            // Re-initialize specific states
            if (typeof currentStep !== 'undefined') currentStep = 0;
            if (typeof currentP !== 'undefined') currentP = 0;
            if (typeof keyFeaturesStep !== 'undefined') keyFeaturesStep = 0;
            if (typeof isTypewriterFinished !== 'undefined') isTypewriterFinished = false;
            
            if (typeof globalSections !== 'undefined' && globalSections[activeSectionIndex]) {
                const targetY = globalSections[activeSectionIndex].offsetTop * scale;
                if (typeof customSmoothScrollTo === 'function') {
                    customSmoothScrollTo(targetY, 800);
                } else {
                    window.scrollTo(0, targetY);
                }
            }
            
            if (typeof updateHeaderTheme === 'function') updateHeaderTheme();
            if (typeof triggerSectionAnimations === 'function') triggerSectionAnimations(activeSectionIndex);
            if (typeof updateSteps === 'function') updateSteps();
            if (typeof updateKeyFeatures === 'function') updateKeyFeatures();
            if (typeof saveScrollState === 'function') saveScrollState();
        }
    } else {
        window.location.href = targetPage + '#section' + targetSectionIndex;
    }
};
