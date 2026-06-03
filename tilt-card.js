/**
 * Tilt Card Effect
 * 
 * This component adds a 3D perspective tilt effect to an element, mirroring the mouse cursor. 
 * As the user hovers over the element, it calculates the mouse position relative to the element's 
 * bounding box and maps it to X and Y rotation angles. It uses CSS \`perspective\` and \`transform\` 
 * to create a sense of depth on a flat layout. A dynamic glare effect is also overlaid to enhance 
 * the 3D realism, while \`prefers-reduced-motion\` ensures accessibility.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Target the newly grouped hero-content-wrapper and any .tilt-card-wrapper
    const tiltElements = document.querySelectorAll("#hero-content-wrapper, .tilt-card-wrapper");
    
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    tiltElements.forEach(el => {
        // Tunable parameters (can be mapped to CSS variables if needed)
        const maxTilt = 18; 
        const glareStrength = 0.5;
        
        // Ensure parent has the correct 3D perspective styles
        el.style.perspective = "1200px";
        el.style.transformStyle = "preserve-3d";
        
        // Create glare pseudo-layer dynamically
        const glare = document.createElement("div");
        glare.className = "tilt-glare";
        glare.style.position = "absolute";
        glare.style.top = "0";
        glare.style.left = "0";
        glare.style.width = "100%";
        glare.style.height = "100%";
        glare.style.background = "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)";
        glare.style.opacity = "0";
        glare.style.pointerEvents = "none";
        glare.style.mixBlendMode = "overlay";
        glare.style.transform = "translateZ(1px)"; // Keep glare slightly above base, below children
        glare.style.borderRadius = "inherit";
        el.appendChild(glare);

        let rafId = null;
        let isHovering = false;

        el.addEventListener("mouseenter", () => {
            isHovering = true;
            el.style.transition = "transform 0.1s ease-out";
            glare.style.transition = "opacity 0.1s ease-out";
        });

        el.addEventListener("mousemove", (e) => {
            if (!isHovering) return;
            const rect = el.getBoundingClientRect();
            
            // Calculate mouse position relative to element bounds (normalized to 0..1)
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Map to -1 to 1 space
            const dx = (x - 0.5) * 2;
            const dy = (y - 0.5) * 2;
            
            // Target tilt angles
            const targetTiltX = -dy * maxTilt;
            const targetTiltY = dx * maxTilt;
            
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                el.style.transform = `perspective(1200px) rotateX(${targetTiltX}deg) rotateY(${targetTiltY}deg)`;
                
                // Dynamic Glare based on mouse angle
                const angle = Math.atan2(dx, dy) * (180 / Math.PI) - 90;
                glare.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`;
                
                // Maximum glare at corners
                const dist = Math.sqrt(dx*dx + dy*dy);
                glare.style.opacity = Math.min(dist * glareStrength, glareStrength);
            });
        });

        el.addEventListener("mouseleave", () => {
            isHovering = false;
            if (rafId) cancelAnimationFrame(rafId);
            
            // Smoothly reset the tilt
            el.style.transition = "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)";
            el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
            
            glare.style.transition = "opacity 0.5s ease-out";
            glare.style.opacity = "0";
        });
    });
});
