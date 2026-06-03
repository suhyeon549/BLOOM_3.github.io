// script.js - Exact Scale and Scroll-Jacking Logic

const ORIGINAL_WIDTH = 1920;
const ORIGINAL_HEIGHT = 8820;

function updateScale() {
    const scale = window.innerWidth / ORIGINAL_WIDTH;
    const wrapper = document.getElementById('scale-wrapper');
    const container = document.getElementById('main-container');
    
    // Apply scale to wrapper to proportionally scale down all 1920px absolute coordinates
    wrapper.style.transform = `scale(${scale})`;
    
    // Set the wrapper's parent height to the scaled height to enable correct scrolling
    container.style.height = `${ORIGINAL_HEIGHT * scale}px`;
    
    // Force a scroll update to place elements correctly
    handleScroll();
}

function handleScroll() {
    const scale = window.innerWidth / ORIGINAL_WIDTH;
    
    // Unscaled metrics for "How it works" section
    const containerTopUnscaled = 4320;
    const containerHeightUnscaled = 3000;
    const trackHeightUnscaled = 1080;
    
    const containerTop = containerTopUnscaled * scale;
    const scrollDistance = (containerHeightUnscaled - trackHeightUnscaled) * scale;
    
    let scrollY = window.scrollY;
    let progress = 0;
    
    if (scrollY >= containerTop) {
        progress = (scrollY - containerTop) / scrollDistance;
    }
    
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    
    // Total translation is 3840px to reach Step 3 (0 -> 1920 -> 3840)
    const slider = document.getElementById('howitworks-slider');
    if(slider) {
        slider.style.transform = `translateX(${-progress * 3840}px)`;
    }
}

window.addEventListener('resize', updateScale);
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('DOMContentLoaded', () => {
    updateScale();
    
    // Ensure slider has correct CSS dynamically just in case
    const slider = document.getElementById('howitworks-slider');
    if(slider) {
        slider.style.position = 'absolute';
        slider.style.left = '0';
        slider.style.top = '0';
        slider.style.width = '100%';
        slider.style.height = '100%';
        // Will-change helps with smooth transform performance
        slider.style.willChange = 'transform';
    }
});
